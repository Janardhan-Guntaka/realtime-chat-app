🚀 Real‑Time Chat Application
This repository contains the source code for a full‑stack, real‑time chat application. The back end is built with Node.js/Express and MongoDB, while the front end is a modern React app bootstrapped with Vite. Real-time messaging is powered by Socket.IO, allowing users to chat instantly in DMs or channels. Features include JWT-based authentication, user profiles, contact/channel management, and file sharing.

🌟 Features
✅ Authentication & Profiles
Register/Login with hashed passwords (bcrypt). JWTs are set in HttpOnly cookies.

Protected routes: Middleware validates JWT and attaches user ID to requests.

Profile management: Users can update names, color theme, and upload avatars (images stored in /uploads/profiles).

User model includes: email, hashed password, optional names, image path, theme, and a profile setup flag.

🗂 Contact & Channel Management
Contact search: Search users by name/email (regex), excluding self.

DM list: Aggregates recent conversations for the sidebar.

Channel creation: Create group channels with members and a name. Channels store admins, members, messages, and return user’s channels sorted by activity.

💬 Messaging
Real‑time direct messages: Sent and received instantly via Socket.IO.

Real‑time channel messages: Channel messages broadcast to all members and stored for history.

File attachments: Upload and send files; files are stored and served from /uploads/files.

Message persistence: All messages are stored and loaded from MongoDB.

🖥 Front‑end
React 18 + Vite: Fast development and hot reload.

State: Global store via Zustand (user, chat, contacts, channels, messages, upload/download progress).

Routing: Private routes guarded with react-router-dom.

Real‑time UI updates: Context wraps socket.io-client and updates state on events.

Responsive UI: Built with Tailwind CSS, Radix UI, Lucide icons, and emoji picker.

🛠 Tech Stack
Layer	Technologies
Front‑end	React 18, Vite, Zustand, React Router DOM, Axios, socket.io-client, Tailwind CSS, Radix UI, Lucide, Emoji Picker
Back‑end	Node.js, Express, Socket.IO, MongoDB (Mongoose), JWT, bcrypt, multer, dotenv, cookie-parser, CORS

🚦 Getting Started
Prerequisites
Node.js 18+

npm 9+

MongoDB instance (local or cloud)

(Optional) pnpm

1. Clone the repository
bash
Copy
Edit
git clone https://github.com/Janardhan-Guntaka/realtime-chat-app.git
cd realtime-chat-app
2. Configure environment variables
In server, create a .env file:

ini
Copy
Edit
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/chatapp
JWT_KEY=yourSecretKey
ORIGIN=http://localhost:5173
PORT=3001
In client, copy .env.example to .env and set:

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
4. Run the application
Back‑end:

bash
Copy
Edit
cd server
npm run dev
Front‑end:

bash
Copy
Edit
cd client
npm run dev
Visit http://localhost:5173 to start using the app!

5. Build for production
bash
Copy
Edit
# Front‑end
cd client
npm run build

# Back‑end: No special build step; just run:
npm start
A Dockerfile is provided to containerize both services—see comments in the file.

📑 API Overview
REST Endpoints (/api):
Method & Route	Description
POST /api/auth/signup	Register user (email, password). Sets JWT cookie.
POST /api/auth/login	Login (email, password). Sets JWT cookie.
POST /api/auth/update-profile	Update first/last name, color.
POST /api/auth/add-profile-image	Upload profile image (multipart/form-data).
GET /api/auth/user-info	Get current user info (requires JWT).
POST /api/contacts/search	Search for contacts by name/email.
GET /api/contacts/get-contacts-for-dm	List recent DM contacts.
GET /api/contacts/get-all-contacts	List all users except current user.
POST /api/channel/create-channel	Create new channel with name, members.
GET /api/channel/get-users-channels	List user’s channels.
GET /api/channel/get-channel-messages/:channelId	Fetch channel message history.
POST /api/messages/get-messages	Fetch DM conversation between users.
POST /api/messages/upload-file	Upload file and return URL (file messages).

Socket.IO Events:
Event	Payload	Description
sendMessage	{ sender, recipient, content, messageType, fileUrl }	Send DM; server emits recieveMessage to both users
send-channel-message	{ sender, channelId, content, messageType, fileUrl }	Send channel message; server broadcasts to all channel members

🤝 Contributing
Pull requests and issues are welcome! Please follow the code style and provide meaningful commit messages.

📄 License
This project is licensed under the ISC license (see LICENSE).
Third-party packages are licensed separately.

Enjoy building and customizing your own real-time chat experience!
Whether you want to practice full-stack skills, learn Socket.IO, or extend features, this repo is a solid starting point.
