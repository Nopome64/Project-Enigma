/// <reference path="./Enigma.js"/>
/// <reference path="./Enigmatest.js"/>
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvs");
const paint = canvas.getContext("2d");
const resolution = {
	x: 1500,
	y: 800,
};
const fontsize = 24;
const rotorplace = {
	left: 450,
	middle: 650,
	right: 850,
};
const boxYoffset = 50;

canvas.style.height = resolution.y;
canvas.height = resolution.y;
canvas.style.width = resolution.x;
canvas.width = resolution.x;

/**
 *
 * @param {string} rotor
 * @param {*} slot
 */
function drawRotor(rotor, slot) {
	const position = slot;

	paint.beginPath();
	for (let letter of alphabet) {
		paint.fillStyle = "black";
		paint.strokeStyle = "black";
		paint.font = `${fontsize}px serif`;
		drawRotorLine(letter, position, rotor);
	}

	paint.stroke();
}
function drawRotorLine(letter, position, rotor) {
	const yOffset = (letter) => boxYoffset + 0.5 * fontsize + (700 / rotor.length) * alphabet.indexOf(letter);

	paint.fillText(letter, position + fontsize * 0.7, yOffset(letter) + fontsize / 2);

	paint.moveTo(position + fontsize / 2, yOffset(letter));
	paint.lineTo(position, yOffset(letter));

	letter = rotor[alphabet.indexOf(letter)];

	paint.lineTo(position - 150, yOffset(letter));
	paint.lineTo(position - 150 - fontsize / 2, yOffset(letter));
}

function drawReflector(ref) {
	for (let i = 0; i < ref.length; i++) {
		let fromletter = alphabet[i];
		let toletter = ref[i];
		drawReflectorLine(fromletter, toletter, ref);
	}
}

function drawReflectorLine(fromletter, toletter, ref) {
	let fromY = boxYoffset + fontsize + (700 / ref.length) * alphabet.indexOf(fromletter);
	let toY = boxYoffset + fontsize + (700 / ref.length) * alphabet.indexOf(toletter);
	if (fromY > toY) return;
	paint.fillText(fromletter, 250 + 13, fromY);
	paint.fillText(toletter, 250 + 13, toY);
	paint.beginPath();
	paint.ellipse(
		250,
		(fromY + toY) / 2 - fontsize / 2,
		(((toY - fromY) / 2) * 1) / 2.5,
		(toY - fromY) / 2,
		0,
		Math.PI * 0.5,
		Math.PI * 1.5
	);
	paint.stroke();
}

/** @param {string[]} path */
function Highlightpath(path) {
	paint.lineWidth = 3;
	paint.fillStyle = "orange";
	paint.strokeStyle = "orange";
	paint.beginPath();
	drawRotorLine(path[0], rotorplace.right, Machine1.config.rotors.rotorRight);
	drawRotorLine(path[1], rotorplace.middle, Machine1.config.rotors.rotorMid);
	drawRotorLine(path[2], rotorplace.left, Machine1.config.rotors.rotorLeft);
	paint.stroke();

	paint.beginPath();
	paint.fillStyle = "red";
	paint.strokeStyle = "red";
	let reflectorletters = [
		path[3].charCodeAt(0) > path[4].charCodeAt(0) ? path[4] : path[3],
		path[3].charCodeAt(0) > path[4].charCodeAt(0) ? path[3] : path[4],
	];
	drawReflectorLine(reflectorletters[0], reflectorletters[1], Machine1.config.rotors.reflector);
	paint.stroke();

	paint.beginPath();
	paint.fillStyle = "green";
	paint.strokeStyle = "green";
	drawRotorLine(path[5], rotorplace.left, Machine1.config.rotors.rotorLeft);
	drawRotorLine(path[6], rotorplace.middle, Machine1.config.rotors.rotorMid);
	drawRotorLine(path[7], rotorplace.right, Machine1.config.rotors.rotorRight);

	paint.stroke();
	paint.lineWidth = 1;
}

function draw() {
	paint.fillStyle = "rgb(10,44,201)";
	paint.fillRect(0, 0, resolution.x, resolution.y);
	paint.fillStyle = "rgba(200,20,10,0.3)";
	for (let i = 0; i < 5; i++) {
		paint.fillRect(100 + i * 200, boxYoffset, 150, 700);
	}

	drawRotor(Machine1.config.rotors.rotorLeft, rotorplace.left);
	drawRotor(Machine1.config.rotors.rotorMid, rotorplace.middle);
	drawRotor(Machine1.config.rotors.rotorRight.rotate(0), rotorplace.right);
	drawReflector(Machine1.config.rotors.reflector);
}
draw();
