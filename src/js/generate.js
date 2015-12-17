const $ = require('jquery');

const Generate = class {

	constructor(Pin, Dots) {

		console.log('new Generate instance');

		this.Pin = Pin;
		this.Dots = Dots;
		this.steps = 100;

		this.displacement = this.generateDisplacement();
		// console.log(this.displacement);
		this.Dots.instances = this.generateCoordinates();
		// console.log(this.Dots.instances);
		this.Dots.renderDots();

	}

	generateCoordinates() {

		const instances = [];

		for (let i = 0; i < this.Dots.total; i += 1) {

			instances[i] = this.locateDot();
			instances[i].reference = this.setAngle();
			instances[i].direction = this.setDirection();
			instances[i].color = this.setColor();

		}

		return instances;

	}

	generateDisplacement() {

		const max = this.Pin.center - this.Dots.radius;
		const increment = Math.pow(max, 1 / (this.steps - 1));
		let displacement = [0, increment];

		for (let i = 2; i < this.steps; i += 1) {

			displacement[i] = displacement[i - 1] * increment;

		}

		return displacement;

	}

	locateDot() {

		// displacement = - / + ?
		// random x value
		// x = - / + ?
		// find y with displacement and x
		// y = - / + ?

		const displacement = this.setDisplacement();
		const x = this.setXaxis(displacement);
		const y = this.setYaxis(x, displacement);
		const coordinates = this.setOrientation(x, y);

		return coordinates;

	}

	setDisplacement() {

		const instance = this.Pin.Helper.randomise({max: this.steps - 1});
		const displacement = this.displacement[instance];

		return displacement;

	}

	setXaxis(displacement) {

		const x = this.Pin.Helper.randomise({max: Math.floor(displacement)});

		return x;

	}

	setYaxis(x, displacement) {

		const y = Math.sqrt(Math.pow(displacement, 2) - Math.pow(x, 2));

		return y;

	}

	setOrientation(...coordinates) {

		for (let i = 0; i < coordinates.length; i +=1) {


			let center = this.Pin.center;

			coordinates[i] = this.Pin.Helper.boolean() ? center += coordinates[i] : center -= coordinates[i];

		}

		return {
			x: coordinates[0],
			y: coordinates[1]
		};

	}

	setAngle() {

		const angle = this.Pin.Helper.randomise({max: 359});

		return angle;

	}

	setDirection() {

		const directions = [
			-2, // Hard left
			-1, // Left
			0, // Straight
			1, // Right
			2  // Hard right
		];
		const option = this.Pin.Helper.randomise({max: directions.length - 1});

		return directions[option];

	}

	setSpeed() {


	}

	setColor() {

		const tone = this.Pin.Helper.boolean() ? 'light' : 'dark';

		return this.Dots.color[tone];

	}

};

module.exports = Generate;
