const $ = require('jquery');

const Helper = class {

	// A series of more “generic” functions uses across the execution.

	constructor(Pin) {

		this.Pin = Pin;

	}

	randomise({min = 0, max}) {

		return Math.floor(Math.random() * (max - min + 1)) + min;

	}

	boolean() {

		return this.randomise({max: 1}) % 2 === 0 ? false : true;

	}

	round(value) {

		// Round value to 1 Decimal place (This helps lessen the computation
		// burden when doing mass calculations to a large amount of decimal
		// places).

		return Math.round(value * 10) / 10;

	}

	convertToRadians(degrees) {

		// radians : degrees = 1 : 57.2958

		return degrees / 57.2958;

	}

};

module.exports = Helper;
