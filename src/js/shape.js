const $ = require('jquery');
const Ring = require('./ring');
const Circle = require('./circle');
const Triangle = require('./triangle');

const Shape = class {

	constructor(Pin) {

		this.Pin = Pin;

		this.Ring = new Ring(Pin, this);
		this.Circle = new Circle(Pin, this);
		this.Triangle = new Triangle(Pin, this);

		this.pause = 60;

	}

	updateDimensions() {

		if (this.Ring.relevanceOuter) { this.Ring.updateOuterRing(); }
		if (!this.Ring.relevanceOuter) { this.pause -= 1; }
		if (!this.Ring.relevanceOuter && this.pause < 0 && this.Ring.relevanceInner) { this.Ring.updateInnerRing(); }

	}

	showDebugTemplate() {

		this.Ring.generateStencil();
		this.Circle.generateStencil();
		this.Triangle.generateStencil();

	}

};

module.exports = Shape;
