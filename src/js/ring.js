const $ = require('jquery');

const Ring = class {

	constructor(Pin) {

		console.log('new Ring instance');

		this.Pin = Pin;

		this.restingOuter = 150;
		this.restingInner = 104;

		this.currentOuter = this.Pin.center;
		this.currentInner = 32;

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

	updateDimensions() {

		if (this.currentOuter > this.restingOuter) {

			this.currentOuter -= 1;

		}

		if (this.currentInner < this.restingInner) {

			this.currentInner += 0.25;

		}

	}

	testRelevance(hypotenuse) {

		return hypotenuse < this.currentOuter && hypotenuse > this.currentInner ? true : false;

	}

};

module.exports = Ring;
