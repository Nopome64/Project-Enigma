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
const rotation=0;
const boxYoffset=50;

function height(letter){
  return(boxYoffset+0.5*fontsize+(700/alphabet.length)*alphabet.indexOf(letter));
}

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
  paint.lineTo(position-150,boxYoffset+0.5*fontsize+(700/rotor.length)*alphabet.rotate(rotation).indexOf(letter));
  paint.lineTo(position-175,boxYoffset+0.5*fontsize+(700/rotor.length)*alphabet.rotate(rotation).indexOf(letter));
}

function drawpath(entry,exit,position){

  // paint.fillStyle="orange";
  // paint.strokeStyle="orange";
  paint.beginPath();
  paint.fillText(entry,position+13,height(entry)+0.5*fontsize);
  paint.moveTo(position+13,height(entry));
  paint.lineTo(position,height(entry));
  paint.lineTo(position-150,height(exit));
  paint.lineTo(position-175,height(exit));
  paint.stroke();
}
function drawRefPath(entry){
  paint.beginPath();

  let l1=entry;
  let l2=Machine1.config.rotors.reflector[alphabet.indexOf(entry)];
  paint.fillText(l1,250+13,height(l1)+0.5*fontsize);
  paint.fillText(l2,250+13,height(l2)+0.5*fontsize);

  let fromY=height(l1);
  let toY=height(l2);

if(fromY<toY){
  paint.ellipse(250,(fromY+toY)/2,((toY-fromY)/2)*1/2.5,(toY-fromY)/2,0,Math.PI*0.5,Math.PI*1.5);
}
else{
  paint.ellipse(250,(toY+fromY)/2,((fromY-toY)/2)*1/2.5,(fromY-toY)/2,0,Math.PI*0.5,Math.PI*1.5);
}
  paint.stroke();

}
function drawReflector(ref){

  for(let letter of ref){
    paint.fillText(letter,250+13,boxYoffset+fontsize+(700/alphabet.length)*alphabet.indexOf(letter));
  }


for(let i=0;i<ref.length;i++){
  let fromletter=alphabet[i];
  let toletter=ref[i];
  let fromY = boxYoffset+fontsize+(700/alphabet.length)*alphabet.indexOf(fromletter);
  let toY = boxYoffset+fontsize+(700/alphabet.length)*alphabet.indexOf(toletter);
  if(fromY>toY){
    continue;
  }
  paint.beginPath();
  paint.ellipse(250,(fromY+toY)/2-fontsize/2,((toY-fromY)/2)*1/2.5,(toY-fromY)/2,0,Math.PI*0.5,Math.PI*1.5);
  paint.stroke();
}

}

function Highlightpath(path){
  paint.lineWidth=2;

  paint.fillStyle="orange";
  paint.strokeStyle="orange";
  
  drawpath(path[0],path[1],rotorplace.right);
  drawpath(path[1],path[2],rotorplace.middle);
  drawpath(path[2],path[3],rotorplace.left);
  paint.fillStyle="red";
  paint.strokeStyle="red";
  drawRefPath(path[3]);
  paint.fillStyle="lime";
  paint.strokeStyle="lime";
  drawpath(path[5],path[4],rotorplace.left);
  drawpath(path[6],path[5],rotorplace.middle);
  drawpath(path[7],path[6],rotorplace.right);

  // draws out the path as text above
  // also showed up as a complete mistake but ended up doing something so i kept it
  drawRotorLine(path,rotorplace.right,Machine1.config.rotors.rotorRight);


  
}

function draw(){
  paint.strokeStyle="black";
  paint.lineWidth=1;

  paint.fillStyle = "rgb(10,44,201)";
  paint.fillRect(0, 0, resolution.x, resolution.y);
  paint.fillStyle = "rgba(200,20,10,0.3)";
  for (let i = 0; i < 5; i++) {
    paint.fillRect(100 + i * 200, boxYoffset, 150, 700);

  }

  
  drawRotor(Machine1.config.rotors.rotorLeft,rotorplace.left);
  drawRotor(Machine1.config.rotors.rotorMid,rotorplace.middle);
  drawRotor(Machine1.config.rotors.rotorRight.rotate(rotation),rotorplace.right);
  drawReflector(Machine1.config.rotors.reflector);
}
draw();
