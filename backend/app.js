const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json({limit: '50mb'}));
app.use(cors());

configRoutes(app);

server.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
