const $ = require('jquery');
const Ring = require('./ring');
const Circle = require('./circle');
const Triangle = require('./triangle');

const Shape = class {

	constructor(Pin) {

		console.log('new Shape instance');

		this.Pin = Pin;

		this.Ring = new Ring(Pin, this);
		this.Circle = new Circle(Pin, this);
		this.Triangle = new Triangle(Pin, this);

		this.pause = 60;

	}

	// this.Pin.Ring.updateDimensions();
	// this.Pin.Circle.updateDimensions();

	updateDimensions() {

		// console.log('updating shape');

		// always outer ring
		// when outer ring = resting | pause fo 1000ms
		// expand outer ring (may need to also animate the circle too?)

		// const outerRing = !this.Ring.relevanceOuter || this.Ring.updateOuterRing();

		if (this.Ring.relevanceOuter) { this.Ring.updateOuterRing(); }
		if (!this.Ring.relevanceOuter) { this.pause -= 1; }
		if (!this.Ring.relevanceOuter && this.pause < 0 && this.Ring.relevanceInner) { this.Ring.updateInnerRing(); }
		// console.log(outerRing);
		// this.pause = outerRing ? this.pause : this.pause += 1;
		// const innerRing = outerRing && this.pause > 1000 || this.Ring.updateInnerRing();


		// if (this.Ring.currentOuter > this.Ring.restingOuter) {
		//
		// 	this.currentOuter -= 1;
		//
		// } else if (this.pause && this.pause !== 0) {
		//
		//
		// } else if (this.Ring.currentOuter === this.Ring.restingOuter && !this.pause) {
		//
		// 	this.pause = 1000;
		//
		// }

	}

	showDebugTemplate() {

		this.Ring.generateStencil();
		this.Circle.generateStencil();
		this.Triangle.generateStencil();

	}

};

module.exports = Shape;
