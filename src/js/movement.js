const $ = require('jquery');

const Movement = class {

	constructor(Pin, Dots) {

		console.log('new Movement instance');

		this.Pin = Pin;
		this.Dots = Dots;
		this.angles = this.generateAngles();

	}

	generateAngles() {

		let angles = [];

		for (let i = 0; i < 90; i += 1) {

			const offset = this.calculateOffset(i);

			angles = this.reflectQuadrants(i, angles, offset.x, offset.y);

		}

		return angles;

	}

	convertToRadians(degrees) {

		// radians : degrees = 1 : 57.2958
		const ratio = 57.2958;

		return degrees / ratio;

	}

	reflectQuadrants(i, angles, x, y) {

		angles[i + (90 * 0)] = {x, y};
		angles[i + (90 * 1)] = {x, y: y * -1};
		angles[i + (90 * 2)] = {x: x * -1, y: y * -1};
		angles[i + (90 * 3)] = {x: x * -1, y};

		return angles;

	}

	calculateOffset(i) {

		const displacement = 1;
		const degrees = this.convertToRadians(i);
		const x = Math.sin(degrees) * displacement;
		const y = Math.cos(degrees) * displacement;

		return {x, y};

	}

	updateDotProperties() {

		// https://jsbin.com/suvebotoxi/edit?js,console
		// https://jsbin.com/rivojuyixe/edit?js,console

		const instances = this.Dots.instances;

		for (let i = 0; i < this.Dots.total; i += 1) {

			const instance = instances[i];

			instance.steps = this.updateSteps(instance);
			instance.reference = instance.steps.reset ? this.updateAngle(instance) : instance.reference;
			const coordinates = this.updateTrajectory(instance);

			instances[i] = {
				x: coordinates.x,
				y: coordinates.y,
				reference: instance.reference,
				speed: instance.speed,
				steps: instance.steps.value,
				color: instance.color
			};

		}

		this.Dots.instances = instances;

	}

	updateSteps(instance) {

		let value = instance.steps -= 1;
		let reset = value <= 0;
		value = reset ? this.Dots.Generate.setSteps() : value;

		return {value, reset};

	}

	updateAngle(instance) {

		const i = this.Pin.Helper.randomise({min: 10, max: 45});
		let reference = this.Pin.Helper.boolean() ? instance.reference -= i : instance.reference += i;

		if (reference >= 360) {

			reference = reference - 360;

		} else if (reference < 0) {

			reference = 360 - (reference * -1);

		}

		return reference;

	}

	updateTrajectory(instance) {

		// console.log(instance);

		const i = instance.reference;
		// console.log(i);
		const angle = this.angles[i];
		const x = angle.x < 0 ? instance.x -= (angle.x * instance.speed * -1) : instance.x += (angle.x * instance.speed);
		const y = angle.y < 0 ? instance.y -= (angle.y * instance.speed * -1) : instance.y += (angle.y * instance.speed);

		// console.log(`instance.x = ${instance.x} vs angle.x = ${angle.x} | instance.y = ${instance.y} vs angle.y = ${angle.y}`);
		// console.log(`${angle.x < 0 ? 'negitive' : 'positive'} = ${x}, ${y}`);

		return {x, y};

	}

	getNewCoordinates(instance) {

		const increment = 1;
		let x;
		let y;
		let hypotenuse;



		// do {

		// x = this.Pin.Helper.boolean() ? instance.x + increment : instance.x - increment;
		// y = this.Pin.Helper.boolean() ? instance.y + increment : instance.y - increment;
		// hypotenuse = this.calculateHypotenuse(x, y);




		// } while(!this.Pin.Ring.testRelevance(hypotenuse)  &&
		//    !this.Pin.Circle.testRelevance(hypotenuse) &&
		//    !this.Pin.Triangle.testRelevance(x, y));

		return {x, y};

	}

	calculateHypotenuse(x, y) {

		const center = this.Pin.center;
		const width = x > center ? x - center : center - x;
		const height = y > center ? y - center : center - y;

		return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

	}

};

module.exports = Movement;
