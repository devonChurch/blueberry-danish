const $ = require('jquery');

const Helper = class {

	constructor(Pin) {

		console.log('new Helper instance');

		this.Pin = Pin;

	}

	randomise({min = 0, max}) {

		return Math.floor(Math.random() * (max - min + 1)) + min;

	}

	boolean() {

		return this.randomise({max: 1}) % 2 === 0 ? false : true;

	}

	round(value) {

		// Round value to 1 Decimal place
		return Math.round(value * 10) / 10;

	}

};

module.exports = Helper;
