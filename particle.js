class Particle {
	constructor(consistence, refraction, levelsrefraction) {
		this.pos = createVector(width / 2, height / 2);
		this.rays = [];

		for (let a = 0; a < 360; a += consistence) {
			this.rays.push(new Ray(this.pos, radians(a), 30));
		}
		this.refraction = refraction;
		this.levelsrefraction = levelsrefraction;
	}

	update(x, y) {
		this.pos.set(x, y);
	}

	reflectioncheck(walls, reflection, counter, distancefromlight) {
		var closestwall = null;
		var closest = Infinity;
		for (wall of walls) {
			var pt = reflection.cast(wall);
			if (pt) {
				let distance = p5.Vector.dist(reflection.pos, pt);
				if (distance < closest) {
					closest = distance;
					closestwall = pt;
				}
			}
		}

		if (closestwall) {
			var reflections = [];
			counter += 1;
			stroke(255, reflection.luminescence / 3);
			strokeWeight(300 / distancefromlight);
			line(reflection.pos.x, reflection.pos.y, closestwall.x, closestwall.y, 1);
			if (counter >= this.levelsrefraction) {
				return;
			} else {
				var newreflection = new Ray(
					closestwall,
					radians(degrees(reflection.angle) + 40),
					reflection.luminescence
				);
				this.reflectioncheck(walls, newreflection, counter, 200);
			}
		}
	}

	look(walls) {
		for (ray of this.rays) {
			var closestwall = null;
			var closest = Infinity;
			for (wall of walls) {
				var pt = ray.cast(wall);
				if (pt) {
					let distance = p5.Vector.dist(this.pos, pt);
					if (distance < closest) {
						closest = distance;
						closestwall = pt;
					}
				}
			}

			if (closestwall) {
				var reflections = [];
				stroke(255, 30);
				strokeWeight(3);
				line(this.pos.x, this.pos.y, closestwall.x, closestwall.y);
				for (i = 0; i < this.refraction; i++) {
					reflections.push(
						new Ray(closestwall, radians(degrees(ray.angle) + 30 + i), ray.luminescence * 1 / 4)
					);
				}

				for (i = 0; i < reflections.length; i++) {
					this.reflectioncheck(walls, reflections[i], 0, closest);
				}
			}
		}
	}

	show() {
		fill(255);
		ellipse(this.pos.x, this.pos.y);
		for (ray of this.rays) {
			ray.show();
		}
	}
}
