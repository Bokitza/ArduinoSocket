const five = require("johnny-five");
const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const app = express();
const server = createServer(app);
const io = new Server(server);
const board = new five.Board();

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});

board.on("ready", function () {
  const led = new five.Led(13);
  photoresistor = new five.Sensor({
    pin: "A2",
    freq: 250,
  });

  io.on("connection", (user) => {
    photoresistor.on("data", function () {
      user.emit("Photoresistor-value", this.value);
    });

    user.on("frequency", (frequency) => {
      console.log(frequency);
      led.off();
      led.blink(frequency);
    });

    user.on("press on", () => {
      led.on();
    });

    user.on("press off", () => {
      led.off();
    });
  });
});
