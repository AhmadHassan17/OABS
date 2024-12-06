



const express = require('express');
const https = require('https');
const fs = require('fs');
const socketIo = require('socket.io');
const { v4: uuidV4 } = require('uuid');
const { PeerServer } = require('peer');

const app = express();

// Load the SSL certificate and key
const serverKey = fs.readFileSync('server.key');
const serverCert = fs.readFileSync('server.cert');

// Create an HTTPS server
const server = https.createServer({ key: serverKey, cert: serverCert }, app);

// Set up Socket.io to work with the HTTPS server
const io = socketIo(server);

// Use the same HTTPS server for the PeerServer
const peerServer = PeerServer({ 
    port: 3001, 
    path: '/peerjs', 
    ssl: {
      key: serverKey,
      cert: serverCert
    }
  });
  
// Continue with the rest of your application
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`);
});

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room });
});

io.on('connection', (socket) => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user-connected", userId);

        socket.on('disconnect', () => {
            socket.broadcast.to(roomId).emit('user-disconnected', userId);
        });
    });
});

// Start the server
const localIp = '192.168.0.104'; // Your local IP address
server.listen(3000, '0.0.0.0', () => {
    console.log(`Server is running on https://${localIp}:3000`);
});




