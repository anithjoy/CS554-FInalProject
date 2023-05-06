const express = require("express");
const app = express();
const cors = require('cors');
const configRoutes = require('./routes');
const {Server} = require("socket.io");
const http = require("http");
const redis = require('redis');
const firebaseAdmin = require('./config/firebase-config');
const data = require("./data");
const client = redis.createClient({});
client.connect().then(() => {});

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use(async(req, res, next) => {
  try {
    if(req.url === '/company'){
      next();
      return;
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    if (decodedToken) {
      req.user = await data.user.getUserByEmail(decodedToken.email);
      next();
      return;
    }
    return res.status(401).json("Unauthorized");
  } catch (e) {
    return res.status(401).json("Unauthorized");
  }
});

app.use("/login",async(req, res) => {
  try {
    firebaseAdmin.auth().deleteUser(req.body.email);
    return res.json("Success");
  } catch (e) {
    return res.status(500).json("Internal server error");
  }
});

app.use('/user', async (req, res, next) => {
  if(req.url === '/' && req.method == "POST" && req.user.role !== "SUPER-ADMIN" && req.user.role !== "ADMIN"){
    return res.status(403).json("Forbidden");
  } else {
    next();
  }
});

app.use('/user/:userId', async (req, res, next) => {
  try{
    if(req.url === '/' && req.method == "PATCH" && req.user.role !== "SUPER-ADMIN" && req.user.role !== "ADMIN" && !await data.validation.isUserHaveAccessToUser(req.user.companyId, req.params.userId)){
      return res.status(403).json("Forbidden");
    } else if(req.url === '/' && req.params.userId !== 'info' && req.method == "GET" && !await data.validation.isUserHaveAccessToUser(req.user.companyId, req.params.userId)){
      return res.status(403).json("Forbidden");
    }else{
      next();
    }
  }catch(e){
    if(typeof e !== 'object' || !('status' in e))
      res.status(500).json("Internal server error");
    else
      res.status(parseInt(e.status)).json(e.error);
    return;
  }
});

app.use('/state', async (req, res, next) => {
  if(req.url === '/' && req.method == "POST" && req.user.role !== "SUPER-ADMIN" && req.user.role !== "ADMIN" && req.user.role !== "MANAGER"){
    return res.status(403).json("Forbidden");
  } else {
    next();
  }
});

app.use('/state/:stateId', async (req, res, next) => {
  try{
    if(req.url === '/' && req.method == "PATCH" && req.user.role !== "SUPER-ADMIN" && req.user.role !== "ADMIN" && req.user.role !== "MANAGER" && !await data.validation.isUserHaveAccessToState(req.user.companyId, req.params.stateId)){
      return res.status(403).json("Forbidden");
    } else if(req.url === '/' && req.method == "GET" && !await data.validation.isUserHaveAccessToState(req.user.companyId, req.params.stateId)){
      return res.status(403).json("Forbidden");
    }else{
      next();
    }
  }catch(e){
    if(typeof e !== 'object' || !('status' in e))
      res.status(500).json("Internal server error");
    else
      res.status(parseInt(e.status)).json(e.error);
    return;
  }
});

app.use('/project', async (req, res, next) => {
  if(req.url === '/' && req.method == "POST" && req.user.role !== "SUPER-ADMIN" && req.user.role !== "ADMIN" && req.user.role !== "MANAGER"){
    return res.status(403).json("Forbidden");
  } else {
    next();
  }
});

app.use('/project/:projectId', async (req, res, next) => {
  try{
    if(req.url === '/' && req.method == "PATCH" && req.user.role !== "SUPER-ADMIN" && req.user.role !== "ADMIN" && req.user.role !== "MANAGER" && !await data.validation.isUserHaveAccessToProject(req.user.email, req.params.projectId)){
      return res.status(403).json("Forbidden");
    } else if((req.url === '/' || req.url === '/ticket') && req.method == "GET" && !await data.validation.isUserHaveAccessToProject(req.user.email, req.params.projectId)){
      return res.status(403).json("Forbidden");
    }else{
      next();
    }
  }catch(e){
    if(typeof e !== 'object' || !('status' in e))
      res.status(500).json("Internal server error");
    else
      res.status(parseInt(e.status)).json(e.error);
    return;
  }
});

app.use('/project/:projectId/sprint', async (req, res, next) => {
  try{
    if(req.url === '/' && req.method == "POST" && req.user.role !== "SUPER-ADMIN" && req.user.role !== "ADMIN" && req.user.role !== "MANAGER" && !await data.validation.isUserHaveAccessToProject(req.user.email, req.params.projectId)){
      return res.status(403).json("Forbidden");
    } else if(req.url === '/' && req.method == "GET" && !await data.validation.isUserHaveAccessToProject(req.user.email, req.params.projectId)){
      return res.status(403).json("Forbidden");
    }else{
      next();
    }
  }catch(e){
    if(typeof e !== 'object' || !('status' in e))
      res.status(500).json("Internal server error");
    else
      res.status(parseInt(e.status)).json(e.error);
    return;
  }
});

app.use('/project/:projectId/sprint/:sprintId', async (req, res, next) => {
  try{
    if(req.url === '/' && req.method == "PATCH" && req.user.role !== "SUPER-ADMIN" && req.user.role !== "ADMIN" && req.user.role !== "MANAGER" && !await data.validation.isUserHaveAccessToProject(req.user.email, req.params.projectId) && !await data.validation.isProjectHaveThisSprint(req.params.projectId, req.params.sprintId)){
      return res.status(403).json("Forbidden");
    } else if(req.url === '/' && req.method == "GET" && (!await data.validation.isUserHaveAccessToProject(req.user.email, req.params.projectId) || !await data.validation.isProjectHaveThisSprint(req.params.projectId, req.params.sprintId))){
      return res.status(403).json("Forbidden");
    }else{
      next();
    }
  }catch(e){
    if(typeof e !== 'object' || !('status' in e))
      res.status(500).json("Internal server error");
    else
      res.status(parseInt(e.status)).json(e.error);
    return;
  }
});

app.use('/ticket', async (req, res, next) => {
  try{
    if(req.url === '/' && req.method === "POST" && (!await data.validation.isUserHaveAccessToProject(req.user.email, req.body.projectId) || (req.body.sprintId && !await data.validation.isProjectHaveThisSprint(req.body.projectId, req.body.sprintId)))){
      return res.status(403).json("Forbidden");
    } else {
      next();
    }
  }catch(e){
    if(typeof e !== 'object' || !('status' in e))
      res.status(500).json("Internal server error");
    else
      res.status(parseInt(e.status)).json(e.error);
    return;
  }
});
app.use('/ticket/:ticketId', async (req, res, next) => {
  try{
    if((req.url === '/' || req.url === "/comment") && !await data.validation.isUserHaveAccessToTicket(req.user, req.params.ticketId)){
      return res.status(403).json("Forbidden");
    }else{
      next();
    }
  }catch(e){
    if(typeof e !== 'object' || !('status' in e))
      res.status(500).json("Internal server error");
    else
      res.status(parseInt(e.status)).json(e.error);
    return;
  }
});

app.use('/ticket/:ticketId/comment/:commentId', async (req, res, next) => {
  try{
    if(req.url === '/' && req.method == "DELETE" && !await data.validation.isUserComment(req.user.email, req.params.commentId)){
      return res.status(403).json("Forbidden");
    }else{
      next();
    }
  }catch(e){
    if(typeof e !== 'object' || !('status' in e))
      res.status(500).json("Internal server error");
    else
      res.status(parseInt(e.status)).json(e.error);
    return;
  }
});

app.use('/:url', async (req, res, next) => {
  if (req.url === '/' && req.method == "GET") {
    let key = req.user.email;
    if(req.params.url === "state" || req.params.url === "user")
      key = req.user.companyId
    let exists = await client.hExists(req.params.url, key);
    if (exists) {
      const list = await client.hGet(req.params.url, key);
      res.json(JSON.parse(list));
      return;
    } else {
      next();
    }
  } else {
    next();
  }
});

app.use('/:url/:id', async (req, res, next) => {
  if (req.url === '/' && req.method == "GET") {
    let exists = await client.exists(req.params.id);
    if (exists) {
      const data = await client.get(req.params.id);
      res.json(JSON.parse(data));
      return;
    } else {
      next();
    }
  } else {
    next();
  }
});

app.use('/project/:projectId/sprint', async (req, res, next) => {
  if (req.url === '/' && req.method == "GET") {
    let exists = await client.hExists("sprint",req.params.projectId);
    if (exists) {
      const recipesList = await client.hGet("sprint", req.params.projectId);
      res.json(JSON.parse(recipesList));
      return;
    } else {
      next();
    }
  } else {
    next();
  }
});

app.use('/project/:projectId/sprint/:sprintId', async (req, res, next) => {
  if (req.url === '/' && req.method == "GET") {
    let exists = await client.exists(req.params.sprintId);
    if (exists) {
      const recipesList = await client.get(req.params.sprintId);
      res.json(JSON.parse(recipesList));
      return;
    } else {
      next();
    }
  } else {
    next();
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
    io.to(ticketId).emit('recieve_ticket_updates');
  });
});

server.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
