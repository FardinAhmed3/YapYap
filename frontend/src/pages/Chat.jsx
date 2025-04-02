import { useEffect, useState, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import { FiSend } from "react-icons/fi";

let socket;

export default function Chat() {
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");

  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  const fetchMessageHistory = async (chatId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE_URL}/messages/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const normalized = res.data.map((msg) => ({
        from: msg.sender,
        to: msg.recipient,
        message: msg.message,
        timestamp: msg.timestamp,
      }));
      setMessages(normalized);
    } catch (err) {
      console.error("Failed to load message history", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    const init = async () => {
      try {
        // Verify token
        await axios.get(`http://localhost:8000/verify-token/${token}`);

        // Get current user info
        const userRes = await axios.get(`http://localhost:8000/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(userRes.data.username);

        // Connect socket
        socket = io("http://localhost:8000", { auth: { token } });

        socket.on("connect", () => setConnected(true));
        socket.on("disconnect", () => setConnected(false));
        socket.on("connect_error", (err) => {
          console.error("Socket connection error:", err);
          setError("Socket connection failed.");
        });
        socket.on("receive_message", (data) => {
          setMessages((prev) => [...prev, data]);
        });
      } catch (err) {
        console.error(err);
        setError("Authentication failed.");
      }
    };

    init();

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  // Scroll to the bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // When a conversation is loaded, fetch its messages from the backend
  const handleLoadConversation = async () => {
    if (!recipient) return;
    const chatId = [username, recipient].sort().join("_");
    await fetchMessageHistory(chatId);
  };

  // Send message using socket and update state
  const handleSend = () => {
    if (!recipient || !message || !socket) return;
    const chatId = [username, recipient].sort().join("_");
    socket.emit("send_message", { to: recipient, message, chat_id: chatId });
    setMessages((prev) => [...prev, { from: username, to: recipient, message }]);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRecipientKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRecipientSelect();
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      {/* Top header with logo */}
      <header className="bg-amber-500 h-16 flex items-center justify-center">
        <img src="/YapYapLogo.svg" alt="Duck Logo" className="h-10" />
      </header>

      {/* Main content: sidebar for recipient input and chat area */}
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar: enter recipient and load conversation */}
        <aside className="w-1/6 bg-white flex flex-col p-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter recipient username"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500"
            />
            <button
              onClick={handleLoadConversation}
              className="mt-2 w-full bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-xl"
            >
              Load Conversation
            </button>
          </div>

          <div className="text-center text-sm text-gray-700">
            Logged in as{" "}
            <span className="font-semibold text-amber-600">
              {username || "..."}
            </span>
            <br />
            {connected ? (
              <span className="text-green-600">Connected ✅</span>
            ) : (
              <span className="text-red-600">Disconnected ❌</span>
            )}
            {error && <div className="text-red-500 mt-1">{error}</div>}
          </div>
        </aside>

        {/* Chat area */}
        <main className="flex-grow bg-amber-50 flex flex-col">
          {/* Messages list */}
          <div className="flex-grow p-4 overflow-y-auto">
            <ul className="flex flex-col gap-2">
              {messages.map((msg, idx) => (
                <li
                  key={idx}
                  className={`p-3 max-w-md rounded-2xl animate-fadeIn ${
                    msg.from === username
                      ? "bg-blue-600 text-white self-end text-right"
                      : "bg-gray-200 text-black self-start text-left"
                  }`}
                >
                  <div className="text-sm font-bold">{msg.from}</div>
                  <div className="text-sm">{msg.message}</div>
                </li>
              ))}
            </ul>
            <div ref={messagesEndRef} />
          </div>
          {/* Input box and send icon */}
          <div className="p-4 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your message."
              value={message}
              onChange={(e) => setMessage(e.target.value)}

              className="flex-grow p-2 rounded-2xl border-2 border-gray-200 focus:outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-300"
              // onKeyPress={handleKeyPress}
            
            />
            <button onClick={handleSend} className="p-2 rounded-full hover:bg-amber-100">
              <FiSend
                size={25}
                className="text-amber-400 hover:text-amber-500 hover:scale-125 transition-transform"
              />
            </button>
          </div>
        </main>
      </div>

      {/* Simple fade-in animation for new messages */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
         }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
