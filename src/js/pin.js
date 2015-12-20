const $ = require('jquery');
const Helper = require('./helper');
const Dots = require('./dots');
const Shape = require('./shape');

const Pin = class {

	constructor() {

		console.log('new Pin instance');

		this.size = 1000;
		this.center = this.size / 2;
		this.ctx = this.generateCanvas();

		this.Helper = new Helper(this);
		this.Shape = new Shape(this);
		this.Dots = new Dots(this);

	}

	generateCanvas() {

		const $canvas = $(`<canvas class="location-pin" width="${this.size}" height="${this.size}" />`);

		$('body').append($canvas);

		return $canvas[0].getContext('2d');

	}

};

module.exports = new Pin();
