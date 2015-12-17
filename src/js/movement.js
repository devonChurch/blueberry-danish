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
			// update angle......
			// const properties = this.getNewCoordinates(instances[i]);
			instance.reference = this.updateAngle(instance);
			// console.log(`angle = ${instance.reference}`);
			const coordinates = this.updateTrajectory(instance);
			// console.log(`coordinates = ${coordinates.x}, ${coordinates.y}`);

			instances[i].x = coordinates.x;
			instances[i].y = coordinates.y;

			/*
			 movement: {
			 	x: 254,
				y: 98,
			 	angle = 145, // 0 --> 360
			 	steps = 6, // 30 --> 120
				direction: left, // hardLeft, left, straight, right, hardRight
				speed: 2 // 1 --> 3
		 	};

			*/

			// instances[i].x = properties.x;
			// instances[i].y = properties.y;

		}

		this.Dots.instances = instances;

	}

	updateAngle(instance) {

		const direction = instance.direction;

		// console.log(`original i = ${instance.reference}`);

		let i = direction < 0 ? instance.reference -= (direction * -1) : instance.reference += direction;

		// console.log(`increase i = ${i}`);

		if (i >= 360) {

			i = i - 360;

		} else if (i < 0) {

			i = 360 - (i * -1);

		}

		// console.log(`return i = ${i}`);
		return i;

	}

	updateTrajectory(instance) {

		const i = instance.reference;
		const angle = this.angles[i];
		const x = angle.x < 0 ? instance.x -= angle.x : instance.x += angle.x;
		const y = angle.y < 0 ? instance.y -= angle.y : instance.y += angle.y;

		console.log(angle.x < 0 ? 'negitive' : 'positive');

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
		// 		!this.Pin.Circle.testRelevance(hypotenuse) &&
		// 		!this.Pin.Triangle.testRelevance(x, y));

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

// updateAngle(instance) {
//
// 	// let angle = instance.angle;
// 	const offset = this.calculateOffset();
// 		// console.log(`offset = ${offset}`);
// 	const angle = this.rebase360(instance.angle, offset);
// 		// console.log(`angle = ${angle}`);
// 	const quadrant = this.quadrantProperties(angle);
// 		// console.log(`quadrant = ${quadrant}`);
// 	const trajectory = this.calculateTrajectory(angle, quadrant);
// 		// console.log(`trajectory = ${trajectory}`);
//
// 	const coordinates = this.updateCoordinates(instance, quadrant, trajectory);
//
// 	return {
// 		angle: angle,
// 		x: coordinates.x,
// 		y: coordinates.y
// 	};
//
// }
//
// calculateOffset() {
//
// 	const max = 1;
// 	const offset = this.Pin.Helper.randomise({max});
//
// 	return offset;
//
// }
//
// rebase360(angle, offset) {
//
// 	console.log(angle, offset);
//
// 	angle = this.Pin.Helper.boolean() ? angle += offset : angle -= offset;
//
// 	// return angle < 0 ? 360 - (angle * -1) : angle > 360 ? angle - 360 : angle;
//
// 	if (angle < 0) {
//
// 		angle = 360 - (angle * -1);
//
// 	} else if (angle > 360) {
//
// 		angle = angle - 360;
//
// 	}
//
// 	return angle;
//
// }
//
//
// quadrantProperties(angle) {
//
// 	let properties = {};
//
// 	if (angle > 0 && angle <= 90) {
//
// 		// console.log('1 -- 90');
// 		properties.location = 0;
// 		properties.positiveX = true;
// 		properties.positiveY = true;
// 		properties.invert = true;
//
// 	} else if (angle > 90 && angle <= 180) {
//
// 		// console.log('91 -- 180');
// 		properties.location = 1;
// 		properties.positiveX = true;
// 		properties.positiveY = false;
// 		properties.invert = false;
//
// 	} else if (angle > 180 && angle <= 270) {
//
// 		// console.log('181 -- 270');
// 		properties.location = 2;
// 		properties.positiveX = false;
// 		properties.positiveY = false;
// 		properties.invert = true;
//
// 	} else { // 271 -- 360 / 0
//
// 		// console.log('271 -- 360 / 0');
// 		properties.location = 3;
// 		properties.positiveX = false;
// 		properties.positiveY = true;
// 		properties.invert = false;
//
// 	}
//
// 	return properties;
//
// }
//
// calculateTrajectory(angle, quadrant) {
//
// 	let trajectory = angle - (quadrant.location * 90);
//
// 	return quadrant.invert ? 90 - trajectory : trajectory;
//
// }
//
// updateCoordinates(instance, quadrant, trajectory) {
//
// 	const width = Math.cos(trajectory) * 2;
// 	const height = Math.sin(trajectory) * 2;
// 	const x = quadrant.positiveX ? instance.x +=  width : instance.x -=  width;
// 	const y = quadrant.positiveY ? instance.y +=  height : instance.y -=  height;
//
// 	// console.log(`triangle = d(${trajectory}), w(${width}), h(${height}), x(${x}), y(${y})`);
//
// 	return {x, y};
//
// 	// instance.x = x;
// 	// instance.y = y;
//
// }
