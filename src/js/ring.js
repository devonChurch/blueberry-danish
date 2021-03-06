const $ = require('jquery');

const Ring = class {

	constructor(Pin, Shape) {

		this.Pin = Pin;
		this.Shape = Shape;

		// Outer ring properties.
		this.relevanceOuter = true;
		this.restingOuter = 150;
		this.currentOuter = this.Pin.center;

		// Inner ring properties
		this.relevanceInner = true;
		this.restingInner = 104;
		this.currentInner = 25;

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
		const radii = [this.currentOuter, this.currentInner];

		for (let i = 0; i < radii.length; i += 1) {

			ctx.beginPath();
			ctx.arc(center, center, radii[i], 0, Math.PI * 2, true);
			ctx.strokeStyle = 'hotpink';
			ctx.stroke();

		}

	}

	// Animate the inner and outer ring...

	updateOuterRing() {

		this.currentOuter -= 0.8;
		this.relevanceOuter = this.restingOuter < this.currentOuter;

	}

	updateInnerRing() {

		this.currentInner += 0.25;
		this.relevanceInner = this.restingInner > this.currentInner;

	}

	testRelevance(hypotenuse) {

		// Test wether the current Dot instance resides inside the outer ring
		// and outside the inner ring.

		return hypotenuse < this.currentOuter && hypotenuse > this.currentInner ? true : false;

	}

};

module.exports = Ring;
