const express = require("express");
const app = express();
const cors = require('cors');
const configRoutes = require('./routes');
const {Server} = require("socket.io");
const http = require("http");

app.use(express.json({ limit: "50mb" }));
app.use(cors());

configRoutes(app);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origins: ["http://localhost:3003"],
    methods: ["GET", "POST"]
  }
})

io.on("connection", (socket) => {
  socket.on('ticket_open', ({ticketId}) => {
    socket.join(ticketId);
  });

  socket.on('ticket_update', ({ticketId}) => {
    io.to(ticketId).emit('recieve_ticket_updets');
  });
});

server.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
