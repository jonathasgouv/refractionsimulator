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

	cSlider = createSlider(0.1, 10, 1, 0.2);
	cSlider.position(20, 20);
	rSlider = createSlider(0, 50, 1, 1);
	rSlider.position(20, 50);
	lrSlider = createSlider(0, 10, 1, 1);
	lrSlider.position(20, 80);
}

function draw() {
	background(0);
	const consistence = map(cSlider.value(), 0.1, 10, 10, 0);
	const refraction = rSlider.value();
	const levelsrefraction = lrSlider.value();
	text('consistence', cSlider.x * 2 + cSlider.width, 35);
	text('refraction', rSlider.x * 2 + rSlider.width, 65);
	text('levels of refraction', lrSlider.x * 2 + lrSlider.width, 95);
	particle = new Particle(consistence, refraction, levelsrefraction);
	for (wall of walls) {
		wall.show();
	}
	particle.update(mouseX, mouseY);
	particle.show();
	particle.look(walls);
}
