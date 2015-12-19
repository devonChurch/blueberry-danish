const $ = require('jquery');

const Generate = class {

	constructor(Pin, Dots) {

		console.log('new Generate instance');

		this.Pin = Pin;
		this.Dots = Dots;
		this.steps = 100;

		this.displacement = this.generateDisplacement();
		this.Dots.instances = this.generateInstances();
		this.Dots.renderDots();

	}

	generateInstances() {

		const instances = [];

		for (let i = 0; i < this.Dots.total; i += 1) {

			const coordinates = this.locateDot();
			const reference = this.setAngle();
			const speed = this.setSpeed();
			const steps = this.setSteps();
			const color = this.setColor();

			instances[i] = {
				x: this.Pin.Helper.round(coordinates.x),
				y: this.Pin.Helper.round(coordinates.y),
				reference,
				speed,
				steps: steps,
				color
			};

			console.log(instances[i]);

		}

		return instances;

	}

	generateDisplacement() {

		const max = this.Pin.center - this.Dots.radius;
		const increment = Math.pow(max, 1 / (this.steps - 1));
		let displacement = [0, increment];

		for (let i = 2; i < this.steps; i += 1) {

			displacement[i] = this.Pin.Helper.round(displacement[i - 1] * increment);

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

		const i = this.Pin.Helper.randomise({max: this.steps - 1});
		const displacement = this.displacement[i];

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

	setSpeed() {

		return 1.5; // this.Pin.Helper.randomise({min: 2, max: 4});

	}

	setSteps() {

		return this.Pin.Helper.randomise({min: 10, max: 40});

	}

	setColor() {

		const tone = this.Pin.Helper.boolean() ? 'light' : 'dark';

		return this.Dots.color[tone];

	}

};

module.exports = Generate;
