/// <reference path="./Enigma.js"/>
/// <reference path="./Enigmatest.js"/>
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvs");
const paint = canvas.getContext("2d");
const resolution = {
  x: 1500,
  y: 800,
};
const fontsize=24;
const rotorplace= {
  left:450,
  middle:650,
  right:850,


}
const boxYoffset=50;


canvas.style.height = resolution.y;
canvas.height = resolution.y;
canvas.style.width = resolution.x;
canvas.width = resolution.x;


/**
 * 
 * @param {string} rotor 
 * @param {*} slot 
 */
function drawRotor(rotor,slot){
  const position=slot

  paint.beginPath();
  for(let letter of rotor){

    console.log(letter,rotor.indexOf(letter));
    paint.fillStyle="black";
    paint.font=`${fontsize}px serif`;
    drawRotorLine(letter,position,rotor);
    
  }

  
  paint.stroke();

}
function drawRotorLine(letter,position,rotor){
  paint.fillText(letter,position+13,boxYoffset+fontsize+(700/rotor.length)*alphabet.indexOf(letter));
  paint.moveTo(position+13,boxYoffset+0.5*fontsize+(700/rotor.length)*rotor.indexOf(letter));
  paint.lineTo(position,boxYoffset+0.5*fontsize+(700/rotor.length)*rotor.indexOf(letter));
  paint.lineTo(position-150,boxYoffset+0.5*fontsize+(700/rotor.length)*alphabet.indexOf(letter));
  paint.lineTo(position-175,boxYoffset+0.5*fontsize+(700/rotor.length)*alphabet.indexOf(letter));
}

function drawReflector(ref){

  for(let letter of ref){
    paint.fillText(letter,250+13,boxYoffset+fontsize+(700/ref.length)*alphabet.indexOf(letter));
  }


for(let i=0;i<ref.length;i++){
  let fromletter=alphabet[i];
  let toletter=ref[i];
  let fromY = boxYoffset+fontsize+(700/ref.length)*alphabet.indexOf(fromletter);
  let toY = boxYoffset+fontsize+(700/ref.length)*alphabet.indexOf(toletter);
  if(fromY>toY){
    continue;
  }
  paint.beginPath();
  paint.ellipse(250,(fromY+toY)/2-fontsize/2,((toY-fromY)/2)*1/2.5,(toY-fromY)/2,0,Math.PI*0.5,Math.PI*1.5)
  paint.stroke();
}

}

function Highlightpath(path){

  paint.fillStyle="orange";
  paint.strokeStyle="orange";
  paint.beginPath();
  drawRotorLine(path,rotorplace.right,Machine1.config.rotors.rotorRight);


  paint.stroke();
}

function draw(){
  paint.fillStyle = "rgb(10,44,201)";
  paint.fillRect(0, 0, resolution.x, resolution.y);
  paint.fillStyle = "rgba(200,20,10,0.3)";
  for (let i = 0; i < 5; i++) {
    paint.fillRect(100 + i * 200, boxYoffset, 150, 700);

  }

  
  drawRotor(Machine1.config.rotors.rotorLeft,rotorplace.left);
  drawRotor(Machine1.config.rotors.rotorMid,rotorplace.middle);
  drawRotor(Machine1.config.rotors.rotorRight.rotate(0),rotorplace.right);
  drawReflector(Machine1.config.rotors.reflector);
}
draw();
