const $ = require('jquery');
const Generate = require('./generate');
const Movement = require('./movement');

const Dots = class {

	// The wrapper Class for the dots functionality. Specifically the rendering
	// and animation loop sequence. The more detailer dot generation and
	// movement calculations are controlled by modules nested within this Class
	// structure.

	constructor(Pin) {

		this.Pin = Pin;
		// Size of a dot.
		this.radius = 5;
		// Total amount (shape + anomalies) of dots.
		this.total = 500;
		// All dot instances
		this.instances = [];
		this.Generate = new Generate(Pin, this);
		this.Movement = new Movement(Pin, this);

		this.moveDots();

	}

	renderDots() {

		for (let i = 0; i < this.total; i += 1) {

			this.placeOnCanvas(this.instances[i]);

		}

	}

	placeOnCanvas(instance) {

		const ctx = this.Pin.ctx;

		ctx.beginPath();
		ctx.arc(instance.x, instance.y, this.radius, 0, Math.PI * 2, true);
		ctx.fillStyle = instance.color;
		ctx.fill();

	}

	moveDots() {

		this.Movement.updateDotProperties();
		this.clearDots();
		this.renderDots();
		this.Pin.Shape.updateDimensions();
		// this.Pin.Shape.showDebugTemplate(); // For debug only

		requestAnimationFrame(() => this.moveDots());

	}

	clearDots() {

		this.Pin.ctx.clearRect(0, 0, this.Pin.size, this.Pin.size);

	}

};

module.exports = Dots;
