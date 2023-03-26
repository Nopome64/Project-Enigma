/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvs");
const paint = canvas.getContext("2d");
const resolution = {
  x: 1500,
  y: 900,
};
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
  const fontsize=24;

  paint.beginPath();
  for(let letter of rotor){

    console.log(letter,rotor.indexOf(letter));
    paint.fillStyle="black";
    paint.font=`${fontsize}px serif`;
    paint.fillText(letter,300,50+fontsize+(700/rotor.length)*rotor.indexOf(letter));
    paint.fillText(letter,400,50+fontsize+(700/rotor.length)*alphabet.indexOf(letter));
  }



}




function draw(){
  paint.fillStyle = "rgb(10,44,201)";
  paint.fillRect(0, 0, resolution.x, resolution.y);
  paint.fillStyle = "rgba(200,20,10,0.3)";
  for (let i = 0; i < 5; i++) {
    paint.fillRect(100 + i * 200, 50, 150, 700);

  }
  paint.beginPath();
  paint.strokeStyle = "black";
  paint.ellipse(250, 500, 100, 250, 0, Math.PI / 2, Math.PI);
  paint.rect(200, 200, 50, 50);
  paint.stroke();
  paint.fill();
  
  drawRotor(Machine1.config.rotors.rotorRight,0);
}
draw();
