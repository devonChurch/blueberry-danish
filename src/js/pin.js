const $ = require('jquery');
const Helper = require('./helper');
const Dots = require('./dots');
const Ring = require('./ring');
const Circle = require('./circle');
const Triangle = require('./triangle');

const Pin = class {

	constructor() {

		console.log('new Pin instance');

		this.size = 1000;
		this.center = this.size / 2;
		this.ctx = this.generateCanvas();

		this.Helper = new Helper(this);
		this.Ring = new Ring(this);
		this.Circle = new Circle(this);
		this.Triangle = new Triangle(this);
		this.Dots = new Dots(this); // new Generate(); // new Placement

	}

	generateCanvas() {

		const $canvas = $(`<canvas class="location-pin" width="${this.size}" height="${this.size}" />`);

		$('body').append($canvas);

		return $canvas[0].getContext('2d');

	}

};

module.exports = new Pin();
