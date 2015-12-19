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

		return {
			x: this.Pin.Helper.round(x),
			y: this.Pin.Helper.round(y)
		};

	}

	//
	//
	//
	//
	//
	//
	//

	updateDotProperties() {

		// https://jsbin.com/suvebotoxi/edit?js,console
		// https://jsbin.com/rivojuyixe/edit?js,console

		const instances = this.Dots.instances;

		for (let i = 0; i < this.Dots.total; i += 1) {

			const instance = instances[i];
			let updates = this.scrutiniseRelevance(instance);

			// console.log(updates);


			// if the relevance needed to be rectified then force steps update!
			updates.steps = this.updateSteps(instance.steps, updates.redirect);
			updates.reference = updates.redirect || updates.steps.reset ? this.updateAngle(instance.reference, updates.redirect) : instance.reference;

			// instance.steps = this.updateSteps(instance);
			// instance.reference = instance.steps.reset ? this.updateAngle(instance) : instance.reference;
			// const coordinates = this.updateTrajectory(instance);

			instances[i] = {
				x: this.Pin.Helper.round(updates.x),
				y: this.Pin.Helper.round(updates.y),
				reference: updates.reference,
				speed: instance.speed,
				steps: updates.steps.value,
				color: instance.color
			};

		}

		this.Dots.instances = instances;

	}

	updateSteps(value, redirect) {

		// console.log(`before ${steps}`);
		value -= 1;
		const reset = value < 0;
		value = reset || redirect ? this.Dots.Generate.setSteps() : value;

		// console.log(`after ${steps}, ${reset}`);
		return {
			value,
			reset
		};

	}

	updateAngle(reference, redirect) {

		// console.log(`BEFORE updating angle -> ref = ${reference}, redirect ${redirect}`);

		const min = redirect ? 30 : 10;
		const max = redirect ? 45 : 25;
		const i = this.Pin.Helper.randomise({min, max});
		reference = this.Pin.Helper.boolean() || redirect ? reference -= i : reference += i;

		if (redirect) {

			// console.log(`hit wall! change to ${i} = ${reference}`);

		}

		if (reference >= 360) {

			reference = reference - 360;

		} else if (reference < 0) {

			reference = 360 - (reference * -1);

		}

		// console.log(`AFTER updating angle -> ref = ${reference}, redirect ${redirect}`);
		return reference;

	}

	updateTrajectory(i, reference, x, y, speed) {

		// console.log(`i ${i} | reference ${reference} | x ${x}, y ${y}`);

		const angle = this.angles[reference];
		x = angle.x < 0 ? x -= (angle.x * speed * -1) : x += (angle.x * speed);
		y = angle.y < 0 ? y -= (angle.y * speed * -1) : y += (angle.y * speed);

		// console.log(`instance.x = ${x} vs angle.x = ${angle.x} | instance.y = ${y} vs angle.y = ${angle.y}`);
		// console.log(`${angle.x < 0 ? 'negitive' : 'positive'} = ${x}, ${y}`);

		return {x, y};

	}

	scrutiniseRelevance(instance) {

		let reference = instance.reference;
		let coordinates;
		let hypotenuse;
		let i = 0;

		// update current trajectory
		// test relevance
		// if NOT relevant than pick another angle


		// instance.reference = instance.steps.reset ? this.updateAngle(instance) : instance.reference;
		// const coordinates = this.updateTrajectory(instance);

		// instance.steps = this.updateSteps(instance);

		do {

			reference = i === 0 ? reference : this.updateAngle(reference, true);
			coordinates = this.updateTrajectory(i, reference, instance.x, instance.y, instance.speed);
			hypotenuse = this.calculateHypotenuse(coordinates.x, coordinates.y);

			i += 1;

			// if (i > 1) {
			// 	console.log(`i ${i} | reference ${reference} | x ${coordinates.x}, y ${coordinates.y}`);
			// }

			// x = this.Pin.Helper.boolean() ? instance.x + increment : instance.x - increment;
			// y = this.Pin.Helper.boolean() ? instance.y + increment : instance.y - increment;
			// hypotenuse = this.calculateHypotenuse(x, y);


		// } while(!this.Pin.Ring.testRelevance(hypotenuse));

		// } while(!this.Pin.Ring.testRelevance(hypotenuse) &&
		// 		!this.Pin.Circle.testRelevance(hypotenuse));

		} while(!this.Pin.Ring.testRelevance(hypotenuse) &&
				!this.Pin.Circle.testRelevance(hypotenuse) &&
				!this.Pin.Triangle.testRelevance(coordinates.x, coordinates.y));

		return {
			x: coordinates.x,
			y: coordinates.y,
			redirect: i > 1, // how many times did the trajectory get resolved
			reference
		};

	}

	calculateHypotenuse(x, y) {

		const center = this.Pin.center;
		const width = x > center ? x - center : center - x;
		const height = y > center ? y - center : center - y;

		return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

	}

};

module.exports = Movement;
