/// <reference path="./rendering.js"/>
const bone=document.getElementById('bone');
const input=document.getElementById('entry')

let Machine1=new EnigmaMachine();

// bone.addEventListener("click",e=>Machine1.encodeChar(input.value));
let activeLetter= "";
window.addEventListener("keydown", (e) => {
	
	if (alphabet.includes(e.key.toUpperCase())){
		activeLetter=e.key.toUpperCase();
	}


	if (e.key==="ArrowUp"){
		Machine1.state.rotorPositions[2]++;
	}
	
	if (e.key==="ArrowDown"){
		Machine1.state.rotorPositions[2]--;
	}
	draw();
	Machine1.encodeChar(activeLetter);
});
