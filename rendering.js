/// <reference path="./Enigma.js"/>
/// <reference path="./Enigmatest.js"/>
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvs");
const paint = canvas.getContext("2d");

let theme= document.getElementById("theme");

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


let Palette={
  backGround:"rgb(10,44,201)",
  frame:"rgba(200,20,10,0.3)",
  entry:"orange",
  turn:"red",
  exit:"lime",

}

let colors={
  Alpha:{
    backGround:"rgb(10,44,201)",
    frame:"rgba(200,20,10,0.3)",
    entry:"orange",
    turn:"red",
    exit:"lime",
  },
  Dandelion: { 
  backGround:"rgb(242,200,82)",
  frame:"rgba(200,20,10,0.3)",
  entry:"blue",
  turn:"white",
  exit:"rgb(5, 239, 242)",
 },
 Lime: { 
  backGround:"rgb(0,255,20)",
  frame:"rgba(200,20,10,0.3)",
  entry:"yellow",
  turn:"purple",
  exit:"rgb(5, 239, 242)",
 },
 Midnight:{ 
  backGround:"rgb(30,30,30)",
  frame:"rgba(0,0,0,1)",
  entry:"red",
  turn:"red",
  exit:"red",
 },
}


function changeTheme(){
  let S = document.getElementById("themes").value;
  Palette=colors[S];
  draw();
}

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
function drawRotor(rotor,slot,rotation){
  const position=slot
  rotor=rotor.rotate(rotation);

  paint.beginPath();
  for(let letter of rotor){

    // console.log(letter,rotor.indexOf(letter));
    paint.fillStyle="black";
    paint.font=`${fontsize}px serif`;
    drawRotorLine(letter,position,rotor,rotation);
    
  }

  
  paint.stroke();

}
function drawRotorLine(letter,position,rotor,rotation){
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


function ShowState(RotorState){
paint.fillStyle="lime";
paint.fillText("State:"+RotorState,1100,30);
paint.fillText("State:"+alphabet[RotorState[0]]+alphabet[RotorState[1]]+alphabet[RotorState[2]],1100,50);


}

function Highlightpath(path){
  paint.lineWidth=2;

  paint.fillStyle=Palette.entry;
  paint.strokeStyle=Palette.entry;
  
  drawpath(path[0],path[1],rotorplace.right);
  drawpath(path[1],path[2],rotorplace.middle);
  drawpath(path[2],path[3],rotorplace.left);
  paint.fillStyle=Palette.turn;
  paint.strokeStyle=Palette.turn;
  drawRefPath(path[3]);
  paint.fillStyle=Palette.exit;
  paint.strokeStyle=Palette.exit;
  
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

  paint.fillStyle = Palette.backGround;
  paint.fillRect(0, 0, resolution.x, resolution.y);
  paint.fillStyle = Palette.frame;
  for (let i = 0; i < 5; i++) {
    paint.fillRect(100 + i * 200, boxYoffset, 150, 700);

  }

  let RP = Machine1.state.rotorPositions;
  let rotors = Machine1.config.rotors;
  drawRotor(rotors.rotorLeft,rotorplace.left,-RP[0]);
  drawRotor(rotors.rotorMid,rotorplace.middle,-RP[1]);
  drawRotor(rotors.rotorRight,rotorplace.right,-RP[2]);
  drawReflector(rotors.reflector);
  ShowState(RP);
}
draw();
