const $ = require('jquery');
const Ring = require('./ring');
const Circle = require('./circle');
const Triangle = require('./triangle');

const Shape = class {

	// Builds the Xerocon pin icon’s shape elements. We also control the shapes
	// resize animation here (condenses the dots into the icon’s final resting
	// shape).

	constructor(Pin) {

		this.Pin = Pin;

		this.Ring = new Ring(Pin, this);
		this.Circle = new Circle(Pin, this);
		this.Triangle = new Triangle(Pin, this);

		// The amount of requestAnimationFrames the space between the outer ring
		// animation finishing and the inner ring animation starting.
		this.pause = 60;

	}

	updateDimensions() {

		if (this.Ring.relevanceOuter) { this.Ring.updateOuterRing(); }
		if (!this.Ring.relevanceOuter) { this.pause -= 1; }
		if (!this.Ring.relevanceOuter && this.pause < 0 && this.Ring.relevanceInner) { this.Ring.updateInnerRing(); }

	}

	showDebugTemplate() {

		// Shows an outline of each of the icons shape elements (great for
		// debugging relevance and animation calculations).

		this.Ring.generateStencil();
		this.Circle.generateStencil();
		this.Triangle.generateStencil();

	}

};

module.exports = Shape;
