const $ = require('jquery');

const Triangle = class {

	constructor(Pin) {

		console.log('new Triangle instance');

		this.Pin = Pin;
		this.size = 84;
		this.x = this.Pin.center - (this.size / 2);
		this.y = this.Pin.center + 130;
		this.ratio = this.calculateRatio();
		this.height = this.size / 2 * this.ratio + this.y;

	}

	calculateRatio() {

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

	testRelevance(x, y) {

		// We need to find if the current dot instance resides within the
		// triangle area. First we test if the square that surrounds the
		// triangle has any relevance and if so we move onto calculating the
		// dots relationship to the triangles actual dimensions.
		//
		// We once again cut the equilateral triangle in half to create an easy
		// to manage right angle triangle. We want to make a right angle
		// triangle out of the current x and y coordinates and reference it
		// against the slope of the actual triangle shape (a larger slope ===
		// outside the triangle area).
		//
		// To create the test we set the triangle to be in either the top left
		// or top right corner of the icon triangle (depending on which is
		// closer i.e. which side of the centre line the dot resides). Using
		// this corner point and the dots location we can drive a width, height
		// and starting point for the reference triangle.
		//
		// From there we use the equilateral ratio to test if the reference
		// triangle height is > or < an equilateral height.

		let center = this.Pin.center,
			offset = this.size / 2;

		if ((x < center - offset || x > center + offset) || (y < this.y || y > this.height)) { return false; }

		// console.log(`Inside square -> x = ${x} vs (${center - offset} || ${center + offset} = ${x < center - offset && x > center + offset}) -> y = ${y} vs (${this.y} && ${this.height} ${y > this.y && y < this.height})`);

		let width = x > center ? (center + offset) - x : x - (center - offset),
			height = y - this.y;

		// console.log(`width: ${width} (${center + offset} - ${x}) | height: ${height} (${y} - ${this.y})`);

		return width * this.ratio > height ? true : false;

	}

};

module.exports = Triangle;
