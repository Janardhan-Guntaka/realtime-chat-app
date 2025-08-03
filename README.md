🚀 Real‑Time Chat Application

This repository contains the source code for a **full‑stack, real‑time chat application**.  
- **Back end:** Node.js/Express, MongoDB  
- **Front end:** React (Vite)  
- **Real-time messaging:** Socket.IO  
Users can chat instantly in DMs or group channels, register with JWT authentication, manage profiles, contacts, channels, and share files.

---

## 🌟 Features

### ✅ Authentication & Profiles
- **Register/Login** (JWT + bcrypt, cookies)
- **Protected routes:** JWT middleware
- **Profile:** Update names, theme, upload avatar (image stored `/uploads/profiles`)
- **User model:** Email, hashed password, names, avatar, theme, setup flag

### 🗂 Contact & Channel Management
- **Search contacts:** By name/email (regex), exclude self
- **DM list:** Recent conversations
- **Channels:** Create/list group channels, manage members/admins/messages

### 💬 Messaging
- **Real‑time DMs:** Send/receive instantly via Socket.IO
- **Real‑time channel chat:** Broadcast to all members, persistent history
- **File attachments:** Upload/send files (`/uploads/files`)
- **Message persistence:** Stored in MongoDB

### 🖥 Front‑end
- **React 18 + Vite:** Fast, modern, hot reload
- **State:** Zustand (user, chat, contacts, channels, messages, progress)
- **Routing:** `react-router-dom` private routes
- **Socket.IO context:** Real-time UI updates
- **Responsive UI:** Tailwind CSS, Radix UI, Lucide icons, emoji picker

---

## 🛠 Tech Stack

| Layer       | Technologies                                                                                 |
|-------------|---------------------------------------------------------------------------------------------|
| **Front‑end**  | React 18, Vite, Zustand, React Router DOM, Axios, socket.io-client, Tailwind CSS, Radix UI, Lucide, Emoji Picker |
| **Back‑end**   | Node.js, Express, Socket.IO, MongoDB (Mongoose), JWT, bcrypt, multer, dotenv, cookie-parser, CORS |

---

## 🚦 Getting Started

**Prerequisites:**  
- Node.js **18+**
- npm **9+**
- MongoDB (local/cloud)
- (Optional) pnpm

### 1. Clone the repo
```bash
git clone https://github.com/Janardhan-Guntaka/realtime-chat-app.git
cd realtime-chat-app
2. Configure environment variables
In server/.env:

ini
Copy
Edit
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/chatapp
JWT_KEY=yourSecretKey
ORIGIN=http://localhost:5173
PORT=3001
In client/.env (copy from .env.example):

ini
Copy
Edit
VITE_SERVER_URL=http://localhost:3001
VITE_SOCKET_URL=http://localhost:3001
3. Install dependencies
bash
Copy
Edit
# Back‑end
cd server
npm install

# Front‑end
cd ../client
npm install
4. Run the app
bash
Copy
Edit
# Back‑end
cd server
npm run dev

# Front‑end (in new terminal)
cd client
npm run dev
Visit http://localhost:5173

5. Production build
bash
Copy
Edit
# Front‑end
cd client
npm run build

# Back‑end: just run
npm start
A Dockerfile is included for full containerization.

📑 API Overview
REST endpoints (/api):

Method & Route	Description
POST /api/auth/signup	Register user (email, password), JWT cookie
POST /api/auth/login	Login, JWT cookie
POST /api/auth/update-profile	Update name/theme
POST /api/auth/add-profile-image	Upload avatar
GET /api/auth/user-info	Get current user
POST /api/contacts/search	Search users
GET /api/contacts/get-contacts-for-dm	Recent DMs
GET /api/contacts/get-all-contacts	All users (except self)
POST /api/channel/create-channel	Create group channel
GET /api/channel/get-users-channels	User’s channels
GET /api/channel/get-channel-messages/:channelId	Channel history
POST /api/messages/get-messages	DM messages
POST /api/messages/upload-file	Upload file for chat

Socket.IO Events:

Event	Payload	Description
sendMessage	{ sender, recipient, content, messageType, fileUrl }	Send DM; server emits to both users
send-channel-message	{ sender, channelId, content, messageType, fileUrl }	Send channel message; server broadcasts to channel

🤝 Contributing
Contributions are welcome! Open an issue or PR. Please follow code style and write meaningful commit messages.

📄 License
Released under the ISC license (see LICENSE).
Third-party packages are licensed separately.
