//select the elements
const cvs = document.getElementById('canvas')
const ctx = cvs.getContext("2d")

//add a border & color to canvas
cvs.style.border = "0.5px solid #2c3e50";


//all game variables
const paddle_width = 100;
const paddle_margin_bottom = 50;
const paddle_height = 20;
let leftArrow = false;
let rightArrow = false;
const ball_radius = 8;
let left = 3; //game life

var brickRowCount = 4;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var score = 0;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

//make line thick
ctx.lineWidth = 2;

//create the paddle
const paddle = {
    x: cvs.width / 2 - paddle_width / 2,
    y: cvs.height - paddle_margin_bottom - paddle_height,
    width: paddle_width,
    height: paddle_height,
    dx: 5,
}

//Gola creation(ball)
const ball = {
    x: cvs.width / 2,
    y: paddle.y - ball_radius,
    radius: ball_radius,
    speed: 4,
    dx: 3,
    dy: -3,
}

document.addEventListener("mousemove", mouseMoveHandler, false);
//moveing the  paddle
document.addEventListener("keydown", (event) => {
    //37 or 39 is the keycode of left or right arrow
    if (event.keyCode == 37) {
        leftArrow = true;
    } else if (event.keyCode == 39) {
        rightArrow = true;
    }
})
document.addEventListener("keyup", (event) => {
    if (event.keyCode == 37) {
        leftArrow = false;
    } else if (event.keyCode == 39) {
        rightArrow = false;
    }
})

function mouseMoveHandler(e) {
    var relativeX = e.clientX - 485;
    console.log(relativeX, " ",cvs.width);
    if(relativeX > 0 && relativeX < cvs.width) {
        paddle.x = relativeX - paddle_width/2;
    }
}
function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
      for(var r=0; r<brickRowCount; r++) {
        if(bricks[c][r].status == 1) {
          var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
          var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "#0095DD";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

// draw paddle
drawPaddle = () => {
    // ctx.fillStyle = "tomato";
    // ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    // ctx.strokeStyle = "#B10217";
    // ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.drawImage(paddle_img,paddle.x,paddle.y);
}

//danding the paddle
dancePaddle = () => {

    if (rightArrow && paddle.x + paddle.width < cvs.width) {
        paddle.x = paddle.x + paddle.dx;
    } else if (leftArrow && paddle.x > 0) {
        paddle.x = paddle.x - paddle.dx;
    }
}


// Gola drawing
drawBall = () => {
    // ctx.beginPath();
    // ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    // ctx.fillStyle = "#B10217";
    // ctx.fill();
    // ctx.strokeStyle = "#6FF20B";
    // ctx.stroke();
    // ctx.closePath();
    ctx.drawImage(ball_img,ball.x,ball.y);
}
//moveing the Gola
moveBall = () => {
    ball.x = ball.x + ball.dx;
    ball.y = ball.y + ball.dy;
}

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
      for(var r=0; r<brickRowCount; r++) {
        var b = bricks[c][r];
        if(b.status == 1) {
          if(ball.x > b.x && ball.x < b.x+brickWidth && ball.y > b.y && ball.y < b.y+brickHeight) {
            ball.dy = -ball.dy;
            b.status = 0;
            score++;
            brick_hit.play();
            if(score == brickRowCount*brickColumnCount) {
                alert("YOU WIN, CONGRATULATIONS!");
                document.location.reload();
                // clearInterval(interval); // Needed for Chrome to end game
            }
            }
        }
      }
    }
  }

//collusion detection using ball and the border(wall)
ballCollusion = () => {
    if (ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }
    if (ball.y + ball.radius > cvs.height) {
        left--;
        if (left <= 0 ){
            alert("game over"); 
            document.location.reload();
        }
        resetBall();
    }
}
//reset the ball
function resetBall() {
    ball.x = cvs.width / 2;
    ball.y = paddle.y - ball_radius;
    ball.dx = 3 * (Math.random() * 2 - 1)
    ball.dy = -3
}

//Ball and the paddle collision
ballPaddleCollision = () => {
    if (ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y) {
        
        let paddle_Vel=0;
        if(leftArrow)
            paddle_Vel=-paddle.dx;
        if(rightArrow)
            paddle_Vel=paddle.dx;
        if(!leftArrow&&!rightArrow)
            paddle_Vel=0;
        let collPaddle = ball.x - (paddle.x + paddle.width / 2);
        collPaddle = collPaddle / (paddle.width / 2)
        //angle of the ball
        let angle = collPaddle * Math.PI / 3;

        ball.dx = paddle_Vel+ball.speed * Math.sin(angle);
        ball.dy = -ball.dy * Math.cos(angle);
        paddle_hit.play();
    }
}


// show game stats
function showGameStats(text, textX, textY, img, imgX, imgY){
    // draw text
    ctx.fillStyle = "#FFF";
    ctx.font = "25px Germania One";
    ctx.fillText(text, textX, textY);
    
    // draw image
    ctx.drawImage(img, imgX, imgY, width = 25, height = 25);
}


//Draw function
draw = () => {
    drawPaddle()
    // drawScore();
    ballPaddleCollision()
    drawBall();
    drawBricks();
    // SHOW SCORE
    showGameStats(score, 45, 480, SCORE_IMG, 10,460 );
    // SHOW LIVES
    showGameStats(left, cvs.width - 25, 480, LIFE_IMG, cvs.width-55, 460); 
}

// update function
update = () => {
    dancePaddle()
    // drawScore();
    moveBall()
    collisionDetection();
    ballCollusion()
    drawBricks();
    // paddle.y = paddle.y - 50;
}

//looping all elements
loop = () => {
    //clear the canvas for displaying images
    ctx.drawImage(bg_img, 0, 0)
    // ctx.clearRect(0, 0, 400, 500)
    draw()
    update()
    requestAnimationFrame(loop)
}

loop()
