/// <reference path="./rendering.js"/>


const BLU= document.getElementById('BLU');
const BMU= document.getElementById('BMU');
const BRU= document.getElementById('BRU');
const BLD= document.getElementById('BLD');
const BMD= document.getElementById('BMD');
const BRD= document.getElementById('BRD');

const bone=document.getElementById('bone');
const input=document.getElementById('entry');

let Machine1=new EnigmaMachine();

// bone.addEventListener("click",e=>Machine1.encodeChar(input.value));
let activeLetter= "";
bone.addEventListener("click",e=>{
	Machine1.reset();
	draw();
	console.log(Machine1.encode(input.value))


});

window.addEventListener("keydown", (e) => {
	
	if (alphabet.includes(e.key.toUpperCase())){
		activeLetter=e.key.toUpperCase();
		Machine1.rotorSpin();
	}


	if (e.key==="ArrowUp"){
		Machine1.state.rotorPositions[2]++;
	}
	
	if (e.key==="ArrowDown"){
		Machine1.state.rotorPositions[2]--;
	}
	if (e.key==="ArrowRight"){
		Machine1.state.rotorPositions[1]++;
	}
	if (e.key==="ArrowLeft"){
		Machine1.state.rotorPositions[1]--;
	}
	draw();
	Machine1.encodeChar(activeLetter);
});


BLU.addEventListener("click",e=>{
	Machine1.state.rotorPositions[0]++;
	draw();
	Machine1.encodeChar(activeLetter);
})
BMU.addEventListener("click",e=>{
	Machine1.state.rotorPositions[1]++;
	draw();
	Machine1.encodeChar(activeLetter);
})
BRU.addEventListener("click",e=>{
	Machine1.state.rotorPositions[2]++;
	draw();
	Machine1.encodeChar(activeLetter);
})
BLD.addEventListener("click",e=>{
	Machine1.state.rotorPositions[0]--;
	draw();
	Machine1.encodeChar(activeLetter);
})
BMD.addEventListener("click",e=>{
	Machine1.state.rotorPositions[1]--;
	draw();
	Machine1.encodeChar(activeLetter);
})
BRD.addEventListener("click",e=>{
	Machine1.state.rotorPositions[2]--;
	draw();
	Machine1.encodeChar(activeLetter);
})