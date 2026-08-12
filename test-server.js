const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "WorkHub Backend API is running" });
});

const server = app.listen(3001, "127.0.0.1", () => {
  console.log("SERVER LISTENING ON 3001");
});

server.on("error", (error) => {
  console.error("SERVER ERROR:", error);
});

server.on("close", () => {
  console.log("SERVER CLOSED");
});

setInterval(() => {
  console.log("SERVER ALIVE");
}, 5000);
