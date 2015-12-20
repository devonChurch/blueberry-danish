const $ = require('jquery');

const Ring = class {

	constructor(Pin, Shape) {

		console.log('new Ring instance');

		this.Pin = Pin;
		this.Shape = Shape;

		this.relevanceOuter = true;
		this.restingOuter = 150;
		this.currentOuter = this.Pin.center;


		this.relevanceInner = true;
		this.restingInner = 104;
		this.currentInner = 25;

	}

	generateStencil() {

		const ctx = this.Pin.ctx;
		const center = this.Pin.center;
		const radii = [this.currentOuter, this.currentInner];

		for (let i = 0; i < radii.length; i += 1) {

			ctx.beginPath();
			ctx.arc(center, center, radii[i], 0, Math.PI * 2, true);
			ctx.strokeStyle = 'black';
			ctx.stroke();

		}

	}

	updateOuterRing() {

		console.log('updating OUTER ring');

		this.currentOuter -= 1;
		this.relevanceOuter = this.restingOuter < this.currentOuter;

	}

	updateInnerRing() {

		console.log('updating INNER ring');

		this.currentInner += 0.25;
		this.relevanceInner = this.restingInner > this.currentInner;

	}

	// updateDimensions() {
	//
	// 	if (this.currentOuter > this.restingOuter) {
	//
	// 		this.currentOuter -= 1;
	//
	// 	} else {
	//
	// 		if (this.currentInner < this.restingInner) {
	//
	// 			this.currentInner += 0.25;
	//
	// 		}
	//
	// 	}
	//
	// }

	testRelevance(hypotenuse) {

		return hypotenuse < this.currentOuter && hypotenuse > this.currentInner ? true : false;

	}

};

module.exports = Ring;
