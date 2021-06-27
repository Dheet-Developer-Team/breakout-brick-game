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
const left = 3; //game life

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

// draw paddle
drawPaddle = () => {
    ctx.fillStyle = "#6FF20B";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.strokeStyle = "#B10217";
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);

}

//danding the paddle
dancePaddle = () => {
    if (rightArrow && paddle.x + paddle.width < cvs.width) {
        paddle.x = paddle.x + paddle.dx;
    } else if (leftArrow && paddle.x > 0) {
        paddle.x = paddle.x - paddle.dx;
    }
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

// Gola drawing
drawBall = () => {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#B10217";
    ctx.fill();
    ctx.strokeStyle = "#6FF20B";
    ctx.stroke();
    ctx.closePath();
}
//moveing the Gola
moveBall = () => {
    ball.x = ball.x + ball.dx;
    ball.y = ball.y + ball.dy;
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
        resetBall();
    }
}
//reset the ball
function resetBall() {
    ball.x = cvs.width / 2;
    ball.y = paddle.y - ball_radius;
    ball.dx = 3;
    ball.dy = -3
}

//Draw function
draw = () => {
    drawPaddle()
    drawBall();
}

// update function
update = () => {
    dancePaddle()
    moveBall()
    ballCollusion()
    // paddle.y = paddle.y - 50;
}

//looping all elements
loop = () => {
    //clear the canvas for displaying images
    ctx.drawImage(bg_img, 0, 0)
    draw()
    update()
    requestAnimationFrame(loop)
}

loop()