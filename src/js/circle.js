const $ = require('jquery');

const Circle = class {

	constructor(Pin) {

		console.log('new Circle instance');

		this.Pin = Pin;

		this.restingRadius = 36;
		this.currentRadius = this.Pin.Ring.currentInner + 5; // Slight overlap with rings inner radius

	}

	generateStencil() {

		const ctx = this.Pin.ctx;
		const center = this.Pin.center;

		ctx.beginPath();
		ctx.arc(center, center, this.currentRadius, 0, Math.PI * 2, true);
		ctx.strokeStyle = 'black';
		ctx.stroke();

	}

	updateDimensions() {

		if (this.currentRadius > this.restingRadius) {

			this.currentRadius -= 2;

		}

	}

	testRelevance(hypotenuse) {

		return hypotenuse < this.currentRadius ? true : false;

	}

};

module.exports = Circle;
