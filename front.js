const blinkFrequency = document.getElementById("blink-frequency");
const blink = document.getElementById("blink");
const turnOn = document.getElementById("on");
const turnOff = document.getElementById("off");

blink.addEventListener("click", () => {
  axios.get("http://localhost:3000/blink?frequency=" + blinkFrequency.value);
});

turnOn.addEventListener("click", () => {
  axios.get("http://localhost:3000/turn-on");
});

turnOff.addEventListener("click", () => {
  axios.get("http://localhost:3000/turn-off");
});
