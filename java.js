   var score = 0;
   var canvas = document.getElementById("myCanvas");
   var ctx = canvas.getContext("2d");
   var blockWidth = 100;
   var blockHeight = 25;
   var x = 220;
   var y = 245;
   var dx = -1.5;
   var dy = -1.75;
   var stickH = 10;
   var stickW = 65;
   var stickX = 200;
   var stichY = 290;
   var ballRadius = 10;
   var ballColor = "lightBlue";
   var rightPressed = false;
   var leftPressed = false;
   var blockstat = [1, 1, 1, 1, 1];;

  function drawBall() {
   ctx.beginPath();
   ctx.arc(x, y, ballRadius, 0, Math.PI*2);
   ctx.fillStyle = ballColor;
   ctx.fill();
   ctx.closePath();
   x += dx;
   y += dy;
}
 function drawStick() {
   ctx.beginPath();
   ctx.rect(stickX, canvas.height - stickH, stickW, stickH);
   ctx.fillStyle = "lightBlue";
   ctx.fill();
   ctx.closePath();
}

var redX = 60;
var redY = 25;
function drawRedBlock() {
   ctx.beginPath();
   ctx.rect(redX, redY, blockWidth, blockHeight);
   ctx.fillStyle = "red";
   ctx.fill();
   ctx.closePath();
}

var blueX = 185;
var blueY = 25;
function drawBlueBlock() {
   ctx.beginPath();
   ctx.rect(blueX, blueY, blockWidth, blockHeight);
   ctx.fillStyle = "blue";
   ctx.fill();
   ctx.closePath();
}

var greenX = 310;
var greenY = 25;
function drawGreenBlock() {
   ctx.beginPath();
   ctx.rect(greenX, greenY, blockWidth, blockHeight);
   ctx.fillStyle = "green";
   ctx.fill();
   ctx.closePath();
}

var purpleX = 120;
var purpleY = 70;
function drawPurpleBlock() {
   ctx.beginPath();
   ctx.rect(purpleX, purpleY, blockWidth, blockHeight);
   ctx.fillStyle = "purple";
   ctx.fill();
   ctx.closePath();
}

var yellowX = 250;
var yellowY = 70;
function drawYellowBlock() {
   ctx.beginPath();
   ctx.rect(yellowX, yellowY, blockWidth, blockHeight);
   ctx.fillStyle = "yellow";
   ctx.fill();
   ctx.closePath();
}

function drawObstackle() {
   ctx.beginPath();
   ctx.rect(125, 185, 135, 10);
   ctx.fillStyle = "black";
   ctx.fill();
   ctx.closePath();
}

function drawBlocks() {
  if(blockstat[0]==1) {drawRedBlock();}
  if(blockstat[1]==1) {drawBlueBlock();}
  if(blockstat[2]==1) {drawGreenBlock();}
  if(blockstat[3]==1) {drawPurpleBlock();}
  if(blockstat[4]==1) {drawYellowBlock();}
}

function draw() {

    if(blockstat[0]==0 && blockstat[1]==0 && blockstat[2]==0 && blockstat[3]==0 && blockstat[4]==0 ){
          alert("CONGRATULATIONS!!");
          document.location.reload();
          clearInterval(interval);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawStick();
    drawObstackle();
    drawBlocks();

   if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {

        if(x > stickX-ballRadius && x < stickX + ballRadius + stickW) {
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }

    if((x+ballRadius==125 || x-ballRadius==260) && y>175 && y<205){
      dx = -dx;
      dy = -dy;
    }
    if(RectCircleColliding(x,y,ballRadius,135,10,125,185)){
      dy = -dy;
    }
    if(RectCircleColliding(x,y,ballRadius,blockWidth, blockHeight,redX, redY)){
      dy = -dy;
      blockstat[0] = 0;
      redY = -1000;
      redX = -1000;
      ballColor = "red";
      score += 20;
      var scoreStr = "Score: "+ score;
      document.getElementById("scoreP").innerHTML = scoreStr;
    }
    if(RectCircleColliding(x,y,ballRadius,blockWidth, blockHeight,blueX, blueY)){
      dy = -dy;
      blockstat[1] = 0;
      blueY = -1000;
      blueX = -1000;
      ballColor = "blue";
      score += 40;
      var scoreStr = "Score: "+ score;
      document.getElementById("scoreP").innerHTML = scoreStr;
    }

    if(RectCircleColliding(x,y,ballRadius,blockWidth, blockHeight,greenX, greenY)){
      dy = -dy;
      blockstat[2] = 0;
      greenY = -1000;
      greenX = -1000;
      ballColor = "green";
      score += 80;
      var scoreStr = "Score: "+ score;
      document.getElementById("scoreP").innerHTML = scoreStr;
    }

    if(RectCircleColliding(x,y,ballRadius,blockWidth, blockHeight,purpleX, purpleY)){
      dy = -dy;
      blockstat[3] = 0;
      purpleY = -1000;
      purpleX = -1000;
      ballColor = "purple";
      score += 60;
      var scoreStr = "Score: "+ score;
      document.getElementById("scoreP").innerHTML = scoreStr;
    }

    if(RectCircleColliding(x,y,ballRadius,blockWidth, blockHeight,yellowX, yellowY)){
      dy = -dy;
      blockstat[4] = 0;
      yellowY = -1000;
      yellowX = -1000;
      ballColor = "yellow";
      score += 50;
      var scoreStr = "Score: "+ score;
      document.getElementById("scoreP").innerHTML = scoreStr;
    }

    if(rightPressed && stickX < canvas.width - stickW) {
    stickX += 5;
    }
    else if(leftPressed && stickX > 0) {
    stickX -= 5;
}
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function RectCircleColliding(cx, cy, cr, rw, rh, rx, ry){
    var half = { x: rw/2, y: rh/2 };
    var center = {
        x: cx - (rx+half.x),
        y: cy - (ry+half.y)};
    var side = {
        x: Math.abs (center.x) - half.x,
        y: Math.abs (center.y) - half.y};
    if (side.x >  cr || side.y >  cr)
        return false;
    if (side.x < -cr && side.y < -cr)
        return true;
    if (side.x < 0 || side.y < 0)
        return true;
    return side.x*side.x + side.y*side.y  < cr*cr;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var interval = setInterval(draw, 10);
