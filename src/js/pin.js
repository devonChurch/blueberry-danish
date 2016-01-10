const $ = require('jquery');
const Helper = require('./helper');
const Shape = require('./shape');
const Dots = require('./dots');
const Heading = require('./heading');

const Pin = class {

	// Wrapper for the “Pin icon” system. The hierarchy below depicts the Class
	// based structure of this execution.
	//
	// -> PIN
	//	  —> HELPER
	//	  —> SHAPE
	//	     -> RING
	//	     -> CIRCLE
	//	     -> TRIANGLE
	//	  —> DOTS
	//	     -> GENERATE
	//	     -> MOVEMENT
	//	  -> HEADING

	constructor() {

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

	activateLogo() {

		// Remove the hidden text class to begin the CSS transition that reveals
		// the Xerocon text. To ensure that we do not keep pinging the DOM each
		// time this function runs we rewrite it into an empty shell.

		this.$logo.removeClass('logo--hide-text');
		this.activateLogo = () => {};

	}

};

module.exports = new Pin();
