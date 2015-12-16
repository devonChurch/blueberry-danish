const $ = require('jquery');
const Generate = require('./generate');
const Movement = require('./movement');

const Dots = class {

	constructor(Pin) {

		console.log('new Dots instance');

		this.Pin = Pin;
		this.radius = 5;
		this.total = 500;
		this.color = this.setColors();
		this.instances = [];
		this.Generate = new Generate(Pin, this);
		this.Movement = new Movement(Pin, this);

		this.moveDots();


	}

	setColors() {

		return {
			light: '#13B5EA',
			dark: '#0D85AB'
		};

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
		// this.Pin.Ring.updateDimensions();
		// this.Pin.Circle.updateDimensions();
		// this.showDebugTemplate(); // For debug only

		requestAnimationFrame(() => this.moveDots());

	}

	showDebugTemplate() {

		this.Pin.Ring.generateStencil();
		this.Pin.Circle.generateStencil();
		this.Pin.Triangle.generateStencil();

	}

	clearDots() {

		this.Pin.ctx.clearRect(0, 0, this.Pin.size, this.Pin.size);

	}

};

module.exports = Dots;
