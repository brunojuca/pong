var canvas = document.getElementById("GameCanvas");
var ctx = canvas.getContext("2d");

function Object(x, y, color, width, height, radius, dx, dy){

	this.x = x;
	this.y = y;
	this.color = color;
	this.width = width;
	this.height = height;
	this.radius = radius;
	this.dx = dx;
	this.dy = dy;

}

var ball = new Object(canvas.width/2, canvas.height/2, "red", 0, 0, 6, 10, 0);

var pad1 = new Object(20, canvas.height/2-75, "black", 10, 150, 0, 0, 6);

var pad2 = new Object(canvas.width-30, canvas.height/2-75, "black", 10, 150, 0, 0, 6);

var wPressed, upPressed, sPressed, downPressed, spacePressed;

var prop;

var vetVel = Math.sqrt(ball.dx*ball.dx+ball.dy*ball.dy);

var score1 = 0;

var score2 = 0;

function finish() {

	if (score1 == 5 || score2 == 5) {
	score1 = 0;
	score2 = 0;
	}

}

function drawScore() {

	ctx.font = "40px Lucida Console";
	ctx.fillStyle = "black"

	ctx.fillText(score1+" x "+score2, canvas.width/2-60, 50);

	
	if (score1 == 0 && score2 == 0 && !spacePressed) {

	ctx.font = "60px Lucida Console";
	ctx.fillStyle = "black"
	ctx.fillText("Ping Pong", 240, 150);

	ctx.font = "20px Lucida Console";
	ctx.fillText("Feito por Bruno Jucá", 280, 250);

	ctx.font = "20px Lucida Console";
	ctx.fillText("Aperte espaço para começar", 250, 360);

	ctx.font = "20px Lucida Console";
	ctx.fillText("Ganha aquele que fizer 5 pontos", 225, 420);


	ctx.font = "20px Lucida Console";
	ctx.fillText("Cima = W", 70, 500);
	ctx.fillText("Baixo = S", 70, 550);
	ctx.fillText("Cima = Seta p/ cima", 500, 500);
	ctx.fillText("Baixo = Seta p/ baixo", 500, 550);

	ctx.globalCompositeOperation = 'destination-over'
	ctx.fillStyle = "#999999";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	}

}

function drawPads() {
	ctx.beginPath();
	ctx.fillStyle = pad1.color;
	ctx.fillRect(pad1.x, pad1.y, pad1.width, pad1.height);
	ctx.fillRect(pad2.x, pad2.y, pad2.width, pad2.height);
	ctx.closePath();
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
	ctx.fillStyle = "darkred";
	ctx.fill();
	ctx.closePath();
}

function ballUpdate() {

	if (spacePressed) {

	ball.x = ball.x + ball.dx;
	ball.y = ball.y + ball.dy;

	if ((ball.y + ball.radius) >= canvas.height || (ball.y - ball.radius) <= 0)
		ball.dy = -ball.dy;

	if ((ball.x + ball.radius) >= canvas.width || (ball.x - ball.radius) <= 0){

		if ((ball.x + ball.radius) >= canvas.width){
			score1++;

			ball = new Object(canvas.width/2, canvas.height/2, "red", 0, 0, 6, -10, 0);
		}

		else {
			score2++;

			ball = new Object(canvas.width/2, canvas.height/2, "red", 0, 0, 6, 10, 0);
		}

		pad1 = new Object(20, canvas.height/2-75, "black", 10, 150, 0, 0, 6);

		pad2 = new Object(canvas.width-30, canvas.height/2-75, "black", 10, 150, 0, 0, 6);

		spacePressed = false;

		vetVel = Math.sqrt(ball.dx*ball.dx+ball.dy*ball.dy);

	}

		

	//Abaixo segue a configuração de colisão com pad2

	if ((ball.x + ball.radius) >= pad2.x && (ball.y) <= (pad2.y+pad2.height) && (ball.y) >= pad2.y) {
		prop = (((ball.y-pad2.y)/pad2.height))
		if (prop >= 0.4 && prop <= 0.6) {
			ball.dx = -vetVel;
			ball.dy = 0;
		}

		if (prop >= 0 && prop <= 0.25) {
			ball.dx = 0.866025*-vetVel;
			ball.dy = 0.5*-vetVel;
		}

		if (prop > 0.25 && prop < 0.4) {
			ball.dx = 0.965925*-vetVel;
			ball.dy = 0.258819*-vetVel;
		}

		if (prop > 0.6 && prop <= 0.75) {
			ball.dx = 0.965925*-vetVel;
			ball.dy = 0.258819*vetVel;
			
		}

		if (prop > 0.75 && prop <= 1) {
			ball.dx = 0.866025*-vetVel;
			ball.dy = 0.5*vetVel;
			
		}

	}
	
	//Abaixo segue a configuração de colisão com pad1

	if ((ball.x - ball.radius) <= (pad1.x+pad1.width) && (ball.y) <= (pad1.y+pad2.height) && (ball.y) >= pad1.y) {
		prop = (((ball.y-pad1.y)/pad1.height))
		if (prop >= 0.4 && prop <= 0.6) {
			ball.dx = vetVel;
			ball.dy = 0;
		}

		if (prop >= 0 && prop <= 0.25) {
			ball.dx = 0.866025*vetVel;
			ball.dy = 0.5*-vetVel;
		}

		if (prop > 0.25 && prop < 0.4) {
			ball.dx = 0.965925*vetVel;
			ball.dy = 0.258819*-vetVel;
		}

		if (prop > 0.6 && prop <= 0.75) {
			ball.dx = 0.965925*vetVel;
			ball.dy = 0.258819*vetVel;
			
		}

		if (prop > 0.75 && prop <= 1) {
			ball.dx = 0.866025*vetVel;
			ball.dy = 0.5*+vetVel;
			
		}
	}

	if (vetVel<30)
		vetVel=vetVel+0.002;
}

}



function padUpdate() {
	

	if (upPressed && (pad2.y > 0))
		pad2.y = pad2.y - pad2.dy;

	if (downPressed && (pad2.y < canvas.height-pad2.height))
		pad2.y = pad2.y + pad2.dy;

	if (wPressed && (pad1.y > 0))
		pad1.y = pad1.y - pad1.dy;

	if (sPressed && (pad1.y < canvas.height-pad1.height))
		pad1.y = pad1.y + pad1.dy;

}



function keyPressed(event) {

	if (event.keyCode == 87)
		wPressed = true;
	else if (event.keyCode == 38)
		upPressed = true;
	else if (event.keyCode == 83)
		sPressed = true;
	else if (event.keyCode == 40)
		downPressed = true;
	else if (event.keyCode == 32)
		spacePressed = true;
}

function keyUnpressed(event) {

	if (event.keyCode == 87)
		wPressed = false;
	else if (event.keyCode == 38)
		upPressed = false;
	else if (event.keyCode == 83)
		sPressed = false;
	else if (event.keyCode == 40)
		downPressed = false;
}


document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyUnpressed);


function draw() {

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawPads();
	drawBall();
	drawScore();
	padUpdate();
	ballUpdate();
	finish();


	requestAnimationFrame(draw);
}

requestAnimationFrame(draw);