const $ = require('jquery');

const Circle = class {

	constructor(Pin, Shape) {

		this.Pin = Pin;
		this.Shape = Shape;
		this.radius = 36;

	}

	generateStencil() {

		// This function is for debug purposes ONLY.
		// Controlled via Pin.Dots.moveDots();
		// It renders the current location of the shape on the canvas with a
		// pink stroke. This is great for testing out your math but the ultimate
		// goal is for the shapes dimensions to be represented by the particle
		// system.

		const ctx = this.Pin.ctx;
		const center = this.Pin.center;

		ctx.beginPath();
		ctx.arc(center, center, this.radius, 0, Math.PI * 2, true);
		ctx.strokeStyle = 'hotpink';
		ctx.stroke();

	}

	testRelevance(hypotenuse) {

		// Test wether the current Dot instance resides inside the circle shape.

		return hypotenuse < this.radius ? true : false;

	}

};

module.exports = Circle;
