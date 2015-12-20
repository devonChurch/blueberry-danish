const $ = require('jquery');
const Helper = require('./helper');
const Shape = require('./shape');
const Dots = require('./dots');
const Heading = require('./heading');

const Pin = class {

	constructor() {

		console.log('new Pin instance');

		this.$logo = $('#logo');
		this.size = 1000;
		this.center = this.size / 2;
		this.ctx = this.generateCanvas();

		this.Helper = new Helper(this);
		this.Shape = new Shape(this);
		this.Dots = new Dots(this);
		this.Heading = new Heading(this);

	}

	generateCanvas() {

		const $canvas = $(`<canvas class="pin" width="${this.size}" height="${this.size}" />`);

		this.$logo.append($canvas);

		return $canvas[0].getContext('2d');

	}

};

module.exports = new Pin();
