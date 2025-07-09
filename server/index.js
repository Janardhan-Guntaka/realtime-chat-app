import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/AuthRoutes.js';
import contactsRoutes from './routes/ContactRoutes.js';
import setupSocket from './socket.js';
import messagesRoutes from './routes/MessagesRoutes.js';
import channelRoutes from './routes/ChannelRoutes.js';

dotenv.config();
console.log('DATABASE_URL:', process.env.DATABASE_URL);

const app= express();
const port = process.env.PORT || 3001;
const databaseURL =  process.env.DATABASE_URL;

app.use(
    cors({
        origin: [process.env.ORIGIN], // allow to server to accept request from different origin
        methods:['GET', 'POST', 'PUT','PATCH', 'DELETE'], // allow to accept request with these methods
        credentials: true, // allow session cookie from browser to pass through
    })
)

app.use("/uploads/profiles", express.static("uploads/profiles")); // serve static files from uploads/profiles directory
app.use("/uploads/files", express.static("uploads/files"));
app.use(cookieParser()); // parse cookie header and populate req.cookies with an object keyed by the cookie names.
app.use(express.json()); // parse incoming request with JSON payloads

app.use('/api/auth', authRoutes)
app.use("/api/contacts", contactsRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/channel", channelRoutes)

const server = app.listen(port, () => {console.log(`Server is running at http://localhost:${port}`)});

setupSocket(server)

mongoose
    .connect(databaseURL)
    .then(()=>console.log('Connected to database Successfully'))
    .catch((err) => console.log('Database Connection Error:', err.message))