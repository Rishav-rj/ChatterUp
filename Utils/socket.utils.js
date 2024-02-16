import {Server} from 'socket.io'
import app from "../index.js"
import http from 'http'
import chatsModel from '../Model/message.Schema.js';

export const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin:'*',
        methods:["GET", "POST"]
    }
});

const onlineUsers = {};

// Connecting Socket.io
io.on("connection", (socket)=>{
    console.log("Connection made");

    // receiving data from client & emoitng it for other users
    socket.on("user", ({username, image})=>{

        onlineUsers[username] = image;
        socket.username = username
        io.emit("allOnlineUsers", onlineUsers);
        // io.emit("userConnected")
    })
    
    // fining all data from Database & sending to all users
    const chatHistory = async ()=>{
        const chats = await chatsModel.find()
        io.emit("chats", (chats));
    }
    chatHistory()

    // Receiving data from client & emiting to all users
    socket.on("sendMessage", async ({user, text})=>{

        const newText = new chatsModel({user, text, image:onlineUsers[user]});
        await newText.save()
        chatHistory()
    })

    // Emiting to other using when the user is typing
    socket.on("typing", (username)=>{
        socket.broadcast.emit("typing", (username))
    })

    // Removing user name from online list once disconnected
    socket.on('disconnect', ()=>{
        // io.emit("userDisconnected")
        delete(onlineUsers[socket.username])

        io.emit("allOnlineUsers", onlineUsers)
    })
})



