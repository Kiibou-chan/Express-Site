let aw = 50;

function setup() {
	createCanvas(400, 450);
	noStroke();
}

function draw() {
	background('#DDD');

	let col = lerpColor(color(33,33,33), color(221, 221, 221), (sin(frameCount / 25) + 1) / 2);

	drawBorder(color(33,33,33));
	drawAliens(col);
	drawPlayer(col);
}

function drawBorder(col) {
	fill(col);
	rect(0, 40, 400, 10);
	rect(0, 400, 400, 10);
}

function drawAliens(col) {
	push();
	translate(0, 50);
	alien(0, 0, col);
	alien(0, 1, col);
	alien(1, 1, col);
	alien(1, 2, col);
	pop();
}

function drawPlayer(col) {
	push();
	player(2, 2, col);
	pop();
}

function alien(x, y, col) {
	let lvl = 5;
	fill(col);
	rect(x * aw + (aw / lvl) * 1, y * aw + (aw / lvl) * 1, aw - (aw / lvl) * 2, aw - (aw / lvl) * 2);
	fill('#DDD');
	rect(x * aw + (aw / lvl) * 2, y * aw + (aw / lvl) * 2, aw - (aw / lvl) * 4, aw - (aw / lvl) * 4);
}

function player(x, y, col) {
	translate(aw * x, aw * y + 50);
	fill('#DDD');
	rect(0, 0, aw, aw);
	fill(col);
	rect(0, 10, 10, 10);
	rect(0, 30, 10, 10);
	rect(10, 0, 20, 10);
	rect(20, 20, 10, 10);
	rect(10, 40, 20, 10);
	rect(30, 10, 10, 10);
	rect(30, 30, 10, 10);
	rect(40, 20, 10, 10);
}