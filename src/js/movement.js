const $ = require('jquery');

const Movement = class {

	constructor(Pin, Dots) {

		console.log('new Movement instance');

		this.Pin = Pin;
		this.Dots = Dots;

	}

	updateDotProperties() {

		// https://jsbin.com/suvebotoxi/edit?js,console
		// https://jsbin.com/rivojuyixe/edit?js,console

		const instances = this.Dots.instances;

		for (let i = 0; i < this.Dots.total; i += 1) {

			// const increment = 3;
			// instances[i].x = this.Pin.Helper.boolean() ? instances[i].x += increment : instances[i].x -= increment;
			// instances[i].y = this.Pin.Helper.boolean() ? instances[i].y += increment : instances[i].y -= increment;

			// const properties = this.updateAngle(instances[i]);
			// console.log(properties);
			// instances[i].angle = properties.angle;
			// instances[i].x = properties.x;
			// instances[i].y = properties.y;

			const properties = this.getNewCoordinates(instances[i]);
			instances[i].x = properties.x;
			instances[i].y = properties.y;

		}

		this.Dots.instances = instances;

	}

	getNewCoordinates(instance) {

		const increment = 2;
		let x;
		let y;
		let hypotenuse;

		do {

			x = this.Pin.Helper.boolean() ? instance.x + increment : instance.x - increment;
			y = this.Pin.Helper.boolean() ? instance.y + increment : instance.y - increment;
			hypotenuse = this.calculateHypotenuse(x, y);


		} while(!this.Pin.Ring.testRelevance(hypotenuse)  &&
				!this.Pin.Circle.testRelevance(hypotenuse));

		return {x, y};

		// ctx.beginPath();
		// ctx.arc(x, y, radius, 0, Math.PI * 2, true);
		// ctx.fillStyle = red;
		// ctx.fill();

	}

	calculateHypotenuse(x, y) {

		const center = this.Pin.center;
		const width = x > center ? x - center : center - x;
		const height = y > center ? y - center : center - y;

		return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

	}



	//
	//
	//
	//
	//
	//
	//
	//

	updateAngle(instance) {

		// let angle = instance.angle;
		const offset = this.calculateOffset();
			// console.log(`offset = ${offset}`);
		const angle = this.rebase360(instance.angle, offset);
			// console.log(`angle = ${angle}`);
		const quadrant = this.quadrantProperties(angle);
			// console.log(`quadrant = ${quadrant}`);
		const trajectory = this.calculateTrajectory(angle, quadrant);
			// console.log(`trajectory = ${trajectory}`);

		const coordinates = this.updateCoordinates(instance, quadrant, trajectory);

		return {
			angle: angle,
			x: coordinates.x,
			y: coordinates.y
		};

		// calculateOffset
		// rebase360
		// quadrantProperties
		// calculateTrajectory
		// updateCoordinates





	}

	calculateOffset() {

		const max = 1;
		const offset = this.Pin.Helper.randomise({max});

		return offset;

	}

	rebase360(angle, offset) {

		console.log(angle, offset);

		angle = this.Pin.Helper.boolean() ? angle += offset : angle -= offset;

		// return angle < 0 ? 360 - (angle * -1) : angle > 360 ? angle - 360 : angle;

		if (angle < 0) {

			angle = 360 - (angle * -1);

		} else if (angle > 360) {

			angle = angle - 360;

		}

		return angle;

	}


	quadrantProperties(angle) {

		let properties = {};

		if (angle > 0 && angle <= 90) {

			// console.log('1 -- 90');
			properties.location = 0;
			properties.positiveX = true;
			properties.positiveY = true;
			properties.invert = true;

		} else if (angle > 90 && angle <= 180) {

			// console.log('91 -- 180');
			properties.location = 1;
			properties.positiveX = true;
			properties.positiveY = false;
			properties.invert = false;

		} else if (angle > 180 && angle <= 270) {

			// console.log('181 -- 270');
			properties.location = 2;
			properties.positiveX = false;
			properties.positiveY = false;
			properties.invert = true;

		} else { // 271 -- 360 / 0

			// console.log('271 -- 360 / 0');
			properties.location = 3;
			properties.positiveX = false;
			properties.positiveY = true;
			properties.invert = false;

		}

		return properties;

	}

	calculateTrajectory(angle, quadrant) {

		let trajectory = angle - (quadrant.location * 90);

		return quadrant.invert ? 90 - trajectory : trajectory;

	}

	updateCoordinates(instance, quadrant, trajectory) {

		const width = Math.cos(trajectory) * 2;
		const height = Math.sin(trajectory) * 2;
		const x = quadrant.positiveX ? instance.x +=  width : instance.x -=  width;
		const y = quadrant.positiveY ? instance.y +=  height : instance.y -=  height;

		// console.log(`triangle = d(${trajectory}), w(${width}), h(${height}), x(${x}), y(${y})`);

		return {x, y};

		// instance.x = x;
		// instance.y = y;

	}

};

module.exports = Movement;


/*

var $canvas = $('#icon');
var ctx = $canvas[0].getContext('2d');
var black = 'rgb(0, 0, 0)';
var white = 'rgb(255, 255, 255)';
var red = 'rgb(255, 0, 0)';
window.requestAnimationFrame(manipulateDots);

function randomise(min, max) {

	return Math.floor(Math.random() * (max - min + 1)) + min;

}

function testCircleRelevance(x, y) {

	var width = x > 150 ? x - 150 : 150 - x;
	var height = y > 150 ? y - 150 : 150 - y;
	var radius = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

	// console.log(`width = ${width} | height = ${height} | radius = ${radius}`);

	return radius < 150 && radius > 50 ? true : false;

}

function testPointRelevance(x, y) {

	// var pointMatch = (Math.pow(10, 2) - Math.pow(5, 2));
	// console.log(pointMatch);
	// console.log(75 / 100);

	// 1.73205081

	// are we in the squares vicinity
	if ((x < 150 - 40 || 150 + 40) && (y < 280 || y > 340)) { return; }

	var width = x > 150 ? (150 + 40) - x : x - (150 - 40); // x - (150 - 40) : (150 + 40) - x;
	var height = y - 280;
	var ratio = 1.73205081;
	// var length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

	if (width * ratio > height) {
		console.log(`x = ${x} | y = ${y} | width = ${width} | height = ${height} | ratio = ${width * ratio}`);

		// var offset = x > 150 ? x - width : x + width;
		// ctx.beginPath();
		// ctx.moveTo(x, y);
		// ctx.lineTo(x, 280);
		// ctx.lineTo(offset, 280);
		// ctx.lineTo(x, y);
		// ctx.strokeStyle = red;
		// ctx.stroke();
	}

	return width * ratio > height ? true : false; // length < pointMatch ? true : false;

}

function placeDot() {

	var radius = 5;
	var x;
	var y;

	do {

		x = randomise(0, 300) - radius;
		y = randomise(0, 350) - radius;

	} while(!testCircleRelevance(x, y) && !testPointRelevance(x, y));

	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2, true);
	ctx.fillStyle = red;
	ctx.fill();

}

function manipulateDots() {

	ctx.clearRect(0,0,300,350);

	for (var i = 0; i < 1000; i += 1) {

		placeDot();

	}

	// buildStencil();

	window.requestAnimationFrame(manipulateDots);

}

function buildStencil() {

	ctx.beginPath();
	ctx.arc(150, 150, 150, 0, Math.PI * 2, true);
	ctx.strokeStyle = black;
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(150, 150, 50, 0, Math.PI * 2, true);
	ctx.strokeStyle = black;
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(150 - 40, 280);
	ctx.lineTo(150, 340);
	ctx.lineTo(150 + 40, 280);
	ctx.strokeStyle = black;
	ctx.stroke();

}

*/
