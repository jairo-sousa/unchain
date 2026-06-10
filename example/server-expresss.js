// npm install is required for this server

const express = require("express");
const path = require("node:path");
const app = express();

app.use(express.static(__dirname));

app.listen(3000, () => {
  console.log("Listening at http://localhost:3000");
});
