//select the elements
const cvs = document.getElementById('canvas')
const ctx = cvs.getContext("2d")

//add a border & color to canvas
cvs.style.border = "2px solid #2c3e50";

//all game variables
const paddle_width = 100;
const paddle_margin_bottom = 50;
const paddle_height = 20;

//make line thick
ctx.lineWidth = 3;

//create the paddle
const paddle = {
    x: cvs.width / 2 - paddle_width / 2,
    y: cvs.height - paddle_margin_bottom - paddle_height,
    width: paddle_width,
    height: paddle_height,
    dx: 5,
}

// draw paddle
function drawPaddle() {
    ctx.fillStyle = "#27ae60";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.strokeStyle = "#f1c40f";
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);

}
drawPaddle()

function loop() {

}