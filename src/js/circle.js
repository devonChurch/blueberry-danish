const $ = require('jquery');

const Circle = class {

	constructor(Pin, Shape) {

		this.Pin = Pin;
		this.Shape = Shape;
		this.radius = 36;

	}

	generateStencil() {

		const ctx = this.Pin.ctx;
		const center = this.Pin.center;

		ctx.beginPath();
		ctx.arc(center, center, this.radius, 0, Math.PI * 2, true);
		ctx.strokeStyle = 'hotpink';
		ctx.stroke();

	}

	testRelevance(hypotenuse) {

		return hypotenuse < this.radius ? true : false;

	}

};

module.exports = Circle;
