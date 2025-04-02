# Introducing YapYap!

We’re building a **real-time chat application** designed for **seamless messaging** with **dedicated UIs** for both **PC & Phone browsers**.

## :star2: **Key Features**
:white_check_mark: **Cross-Platform** – Access via PC & phone browsers.  
:white_check_mark: **Easy Sign-Up** – Register using **Google OAuth** or **Email & Password**.  
:white_check_mark: **Friend System** – Add friends and **chat in real-time**.  
:white_check_mark: **Secure & Scalable** – Built with industry-leading technologies such as MongoDB, RabbitMQ, Redis

## 🛠️ **Tech Stack**

### 🏗️ **System Design & Architecture**  
**:small_blue_diamond: Microservices Architecture** – Modular & scalable interconnected components  
**:small_blue_diamond: Docker** – Containerized hosting for services  

### 🎨 **Frontend**  
**:small_blue_diamond: React + Vite** :zap:  
**:small_blue_diamond: TailwindCSS** :art:  
**:small_blue_diamond: Axios & Socket.IO** for communication :arrows_counterclockwise:  

### ⚙️ **Backend**  
**:small_blue_diamond: FastAPI** (APIs, OAuth2 authentication, backend services) :rocket:  
**:small_blue_diamond: WebSockets + Socket.IO** (Real-time messaging)  
**:small_blue_diamond: RabbitMQ** (Message queue service for async communication)  

### 🗄️ **Database & Caching**  
**:small_blue_diamond: SQL & NoSQL Databases** – **MySQL & MongoDB** :floppy_disk:  
**:small_blue_diamond: Redis** (Caching for reliability & high availability) 🏎️

## Installation

### FastAPI Setup
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### Create `.env` file in `backend/`
Replace placeholder values with your actual credentials and secret keys:
```env
# --- MySQL Configuration ---
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_NAME=

# --- MongoDB Configuration ---
MONGODB_URI=mongodb+srv://

# --- RabbitMQ Configuration ---
RABBITMQ_URL=amqp://

# --- JWT Secret ---
JWT_SECRET_KEY=your_super_secret_key
```
Run the backend server from `backend/` using:
```bash
uvicorn main:app --reload
```

### Frontend Setup
Install [Node](https://nodejs.org/en/download):
```bash
cd frontend
npm install
```

### Create `.env` file in `frontend/`
Put this in your `.env`:
```env
VITE_API_BASE_URL=http://localhost:8000
```

Start the frontend from `frontend/` using:
```bash
npm run dev
```

## Development Servers
- Frontend: `http://localhost:5137`
- Backend: `http://localhost:8000/docs`
