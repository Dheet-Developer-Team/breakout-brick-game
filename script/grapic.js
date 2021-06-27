// create a bg
const bg_img = new Image()
bg_img.src = "/imgs/dheet.jpg"
const paddle_img = new Image();
paddle_img.src = "/imgs/paddlepx.png";
const ball_img = new Image();
ball_img.src = "/imgs/ballpx.png";





// live score level

const LEVEL_IMG = new Image();
LEVEL_IMG.src = "imgs/level.png";

const LIFE_IMG = new Image();
LIFE_IMG.src = "imgs/life.png";

const SCORE_IMG = new Image();
SCORE_IMG.src = "imgs/score.png";


var paddle_hit = new Audio("/audio/padhit.wav");
var brick_hit = new Audio("/audio/brickhit.wav");
// var paddle_hit = new Audio("/audio/padhit.wav");

