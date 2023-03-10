/** @type {HTMLCanvasElement} */
const canvas=document.getElementById("canvs");
const paint=canvas.getContext("2d");
const resolution={
    x:1500,
    y:900,
};
canvas.style.height=resolution.y;
canvas.height=resolution.y;
canvas.style.width=resolution.x;
canvas.width=resolution.x;

paint.fillStyle="rgb(10,44,201)"
paint.fillRect(0,0,resolution.x,resolution.y);


paint.fillStyle="rgba(200,20,10,0.3)"
for(let i=0;i<5;i++){
    
    paint.fillRect(100+i*200,50,150,700);
}
paint.strokeStyle
paint.ellipse(250,500,100,250,0,Math.PI/2,Math.Pi*1.5)
paint.stroke();