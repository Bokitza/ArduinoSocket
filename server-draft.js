const five = require("johnny-five");
const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("node:http");

const app = express();
const server = createServer(app);
const io = new Server(server);

const port = 3000;

io.on("connection", (socket) => {
  console.log("omg! somebody connected!!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const board = new five.Board();

board.on("ready", function () {
  //board is ready - start defining stuff...
  const led = new five.Led(13);

  app.get("/turn-on", (req, res) => {
    led.on();
    res.sendStatus(200);
  });

  app.get("/blink", (req, res) => {
    const frequency = req.query.frequency;
    led.blink(frequency);
    res.sendStatus(200);
  });

  app.get("/turn-off", (req, res) => {
    led.off();
    res.sendStatus(200);
  });
});
