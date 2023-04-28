import { EnigmaMachine } from "./Enigma.js";
import { draw } from "./rendering.js";

const bone = document.getElementById("bone");
const input = document.getElementById("entry");

let Machine1 = new EnigmaMachine();

// bone.addEventListener("click",e=>Machine1.encodeChar(input.value));

window.addEventListener("keydown", (e) => {
  draw(Machine1);
  Machine1.encodeChar(e.key.toUpperCase());
});

draw(Machine1);
