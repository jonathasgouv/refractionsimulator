let walls = [];
let ray;
let particle;

function setup() {
	createCanvas(windowWidth, windowHeight);
	for (i = 0; i < 5; i++) {
		walls.push(new Obstacle(random(width), random(height), random(width), random(height)));
	}

	walls.push(new Obstacle(0, 0, width, 0));
	walls.push(new Obstacle(0, 0, 0, height));
	walls.push(new Obstacle(0, height, width, height));
	walls.push(new Obstacle(width, 0, width, height));

	particle = new Particle();
}

function draw() {
	background(0);
	for (wall of walls) {
		wall.show();
	}
	particle.update(mouseX, mouseY);
	particle.show();
	particle.look(walls);
}
