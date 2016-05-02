$(document).ready(function() {

/* opi green*/
	
var width = window.innerWidth,
height = window.innerHeight*2, /* Add "*2" after "window.innerHeight" if paint doesn't extend to the bottom of page */
c = document.getElementById('o'),
ctx = c.getContext('2d');
c.width = width;
c.height = height;


var paint = [];

var totalPaints = width/50;
var size = 20;

function init(){
    for (var i = 0; i < totalPaints; i++){
        addPaint();
    }
    setInterval( update, 20 ); /* replace "40" to a different number to change speed of flow */
}

function drawPaint(x,y,size, colour) {
    ctx.beginPath();
    ctx.arc(x, y, size ,0 , Math.PI*2, true); /* change "2" to odd number for rectangle */
    ctx.closePath();
	ctx.fillStyle=colour;
	ctx.fill();
}

function update(){
    for (var i = 0; i < paint.length; i++){
        paint[i].y = paint[i].y + paint[i].v;
        if (paint[i].y > height + 60){
            paint.splice(i,1);
            addPaint();
        }
        drawPaint(paint[i].x, paint[i].y, paint[i].s, paint[i].c);
    }
}

function addPaint(){
    //Try 50 times
    var i = 50;
    while(i > 0){
        size = Math.random() * size + 10; //change "10" to different number to change thickness, but increasing size too much will cause page to slow down or even refuse to load
        x = Math.random() * width;

        found = false;

        //Dont Allow drips ontop of each other (Overtaking drops destroy the prettyness)
        for (var j = 0; j < paint.length; j++){
            if ((x + size > paint[j].x) && (x - size < paint[j].x + paint[j].s)){
                found = true;
                break;
            }

            if ((x - size < paint[j].x) && (x + size > paint[j].x - paint[j].s)){
                found = true;
                break;
            }
        }

        if (found === false){
            paint.push({s:size,
                       x:x,
                       y:-60,
                       v:(Math.random() * 2) + 2,
                       c:'#' + (0xb3ddcd).toString(16)}); /* replace "000000" to the exact hexadecimal color code that you want */
			i--;
            return;
        }
    }
}

init();


});