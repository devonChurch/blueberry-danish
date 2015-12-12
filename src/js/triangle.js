const $ = require('jquery');

// location pin

const Triangle = class {

	constructor(Pin) {

		console.log('new Triangle instance');

		this.Pin = Pin;
		this.size = 84;
		this.x = this.Pin.center - (this.size / 2);
		this.y = this.Pin.center + 130;
		this.ratio = this.generateRatio();

		this.generateStencil(); // for debuging ONLY

	}

	generateRatio() {

		// Find the ratio of an equilateral triangles incline in respect to its
		// width and height properties.
		//
		// This will help us in generating the stencil area but more importantly
		// we can test if a dot resides within the triangle by using the ratio
		// as a maximum value i.e if the incline ratio of a dot is > base ratio
		// it is outside the triangle area.
		//
		// We do this by cutting the equilateral triangle in half to create an
		// easy to manage right angle triangle. From there we use the known
		// values (width and hypotenuse) to generate the height of the triangle.
		// Now we know all 3 side measurements we can create a ratio between the
		// width and the height.

		const width = 10 / 2;
		const hypotenuse = 10;
		const height = Math.sqrt(Math.pow(hypotenuse, 2) - Math.pow(width, 2));

		return height / width;

	// \-------/
	// 	\  |  /
	// 	 \ | /
	// 	  \|/

	}

	generateStencil() {

		const ctx = this.Pin.ctx;

		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x + this.size, this.y);
		ctx.lineTo(this.Pin.center, this.size / 2 * this.ratio + this.y);
		ctx.lineTo(this.x, this.y);
		ctx.strokeStyle = 'black';
		ctx.stroke();

	}

};

module.exports = Triangle;


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
