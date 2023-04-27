const express = require("express");
const app = express();
const cors = require('cors');
const configRoutes = require('./routes');
const {Server} = require("socket.io");
const http = require("http");
const firebaseAdmin = require('./config/firebase-config');
const data = require("./data");

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use(async(req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    if (decodedToken) {
      if(req.url != '/company')
        req.user = await data.user.getUserByEmail(decodedToken.email);
      else
        req.user = decodedToken.email;
      next();
      return;
    }
    return res.status(401).json("Unauthorized");
  } catch (e) {
    return res.status(401).json("Unauthorized");
  }
});

app.use("/login",async(req, res, next) => {
  try {
    firebaseAdmin.auth().deleteUser(req.body.email);
    return res.json("Success");
  } catch (e) {
    return res.status(500).json("Internal server error");
  }
});


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
