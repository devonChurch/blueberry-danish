const $ = require('jquery');
const Generate = require('./generate');
const Movement = require('./movement');

const Dots = class {

	constructor(Pin) {

		console.log('new Dots instance');

		this.Pin = Pin;
		this.radius = 5;
		this.total = 100;
		this.color = this.setColors();
		console.log(this.color);
		this.instances = [];
		this.Generate = new Generate(Pin, this);
		this.Movement = new Movement(Pin, this);

		this.moveDots();


	}

	setColors() {

		return {
			light: '#13B5EA',
			dark: '#0D85AB' // '#1E3240'
		};

	}

	renderDots() {

		for (let i = 0; i < this.total; i += 1) {

			const instance = this.instances[i];
			this.placeOnCanvas(instance);

		}

	}

	placeOnCanvas(instance) {

		const ctx = this.Pin.ctx;

		ctx.beginPath();
		ctx.arc(instance.x, instance.y, this.radius, 0, Math.PI * 2, true);
		ctx.fillStyle = instance.color;
		ctx.fill();

	}

	moveDots() {

		console.log('Moving....');

		// const callback = this.moveDots;

		this.Movement.updateDotProperties();
		this.clearDots();
		this.renderDots();

		requestAnimationFrame(() => {

			// callback();

			this.moveDots();

		});

	}

	clearDots() {

		this.Pin.ctx.clearRect(0, 0, this.Pin.size, this.Pin.size);

	}

};

module.exports = Dots;


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
