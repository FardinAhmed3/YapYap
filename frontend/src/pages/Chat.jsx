import { useEffect, useState, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";

let socket;

export default function Chat() {
  const [username, setUsername] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  const fetchMessageHistory = async (chatId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`https://api.fardinahmed.com/messages/${chatId}`, {
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
        await axios.get(`https://api.fardinahmed.com/verify-token/${token}`);
        const userRes = await axios.get(`https://api.fardinahmed.com/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(userRes.data.username);
        socket = io("https://api.fardinahmed.com", { auth: { token } });
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleRecipientSelect = async () => {
    if (!recipient || !username) return;
    const chatId = [username, recipient].sort().join("_");
    await fetchMessageHistory(chatId);
  };

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
    <div className="bg-amber-400 h-screen w-full flex items-center justify-center">
      <div className="flex w-[95%] h-[95%] rounded-xl shadow-lg overflow-hidden">
        <aside className="w-1/3 bg-white p-4 flex flex-col">
          <h2 className="text-xl font-bold text-center mb-4">Start a Chat</h2>
          <label className="text-sm mb-2">Recipient Username:</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            onKeyPress={handleRecipientKeyPress}
            placeholder="Enter recipient username"
            className="w-full p-2 rounded border border-gray-500 focus:outline-none focus:ring-amber-400"
          />
          <button
            onClick={handleRecipientSelect}
            className="w-full bg-amber-500 hover:bg-amber-600 p-2 rounded font-semibold my-4"
          >
            Load Conversation
          </button>
          <div className="text-center text-sm text-gray-700">
            Logged in as {" "}
            <span className="font-semibold text-amber-600">
              {username || "..."}
            </span>
            <br />
            {connected ? (
              <span className="text-green-600">Connected ✅</span>
            ) : (
              <span className="text-red-600">Disconnected ❌</span>
            )}
          </div>
          {error && (
            <div className="text-center text-sm text-red-500 mt-2">{error}</div>
          )}
        </aside>
        <main className="w-2/3 bg-amber-50 flex flex-col h-full">
          <div className="flex-grow p-4 overflow-y-auto">
            <ul className="flex flex-col gap-2">
              {messages.map((msg, idx) => (
                <li
                  key={idx}
                  className={`p-3 max-w-md rounded-lg animate-fadeIn ${
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
          <div className="p-4 flex gap-2">
            <input
              type="text"
              placeholder="Type your message...🚀"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-grow p-2 rounded border border-gray-500 focus:outline-none focus:ring-amber-400"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
            >
              Send
            </button>
          </div>
        </main>
      </div>
      <style>
        {`
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