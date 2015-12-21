const $ = require('jquery');

const Generate = class {

	// Creates each of the dot instances on load along with their various
	// properties in which their behaviour / aesthetic is governed by.

	constructor(Pin, Dots) {

		this.Pin = Pin;
		this.Dots = Dots;
		// Amount of incremental steps in the displacement array.
		this.steps = 100;

		this.displacement = this.generateDisplacement();
		this.Dots.instances = this.generateInstances();
		this.generateAnomalies();
		this.Dots.renderDots();

	}

	generateInstances() {

		const instances = [];

		for (let i = 0; i < this.Dots.total; i += 1) {

			const coordinates = this.locateDot();
			const reference = this.setAngle();
			const speed = this.setSpeed();
			const steps = this.setSteps();
			const color = this.setColor();

			instances[i] = {
				x: this.Pin.Helper.round(coordinates.x),
				y: this.Pin.Helper.round(coordinates.y),
				reference,
				speed,
				steps: steps,
				color,
				anomaly: false
			};

		}

		return instances;

	}

	generateAnomalies() {

		// Too add some diversity to the execution we create dots called
		// anomalies. These dots to not conform to the restrictions of the pin
		// shape and instead are contained by the radius of the very edge of the
		// canvas area. Visually this is more appealing as there not a huge void
		// of redundant space when the icon is completely formed in the venter
		// of the canvas.

		// What percentage of the total dots on the canvas will be anomalies.
		const percent = 10;
		const increment = this.Dots.total / (percent / 100 * this.Dots.total);

		for (let i = 0; i < this.Dots.total; i += increment) {

			this.Dots.instances[i].anomaly = true;

		}

	}

	generateDisplacement() {

		// When the dots are very first generated on the page there is a void in
		// the middle with no dot population immediately followed by a heavy
		// consolidation of dot instances that exponentially fade away to the
		// outer edges of the canvas area. This function much like the angle
		// generation in the Movement Class - creates an array with an
		// exponential displacement sequence. this sequence only focus on the
		// hypotenuse of the displacement triangle (the +/-x, +/-y will be
		// calculated afterwards).

		// The radius of the centeral void.
		const offset = 200;
		const max = this.Pin.center - this.Dots.radius - offset;
		const increment = Math.pow(max, 1 / (this.steps - 1));
		let displacement = [0, increment];

		for (let i = 2; i < this.steps; i += 1) {

			displacement[i] = (displacement[i - 1] * increment);

		}

		return this.displacementOffset(displacement, offset);

	}

	displacementOffset(displacement, offset) {

		// After calculating the zero based exponential displacement array we
		// add on the central void offset to push the max displacement right to
		// the canvas area edge.

		for (let i = 0; i < this.steps; i += 1) {

			displacement[i] += Math.floor(offset);

		}

		return displacement;

	}

	locateDot() {

		// Randomises the x and y position (i.e. +/-x, +/-y,) relative to the
		// random hypotenuse value fetched from the exponential displacement
		// array.

		const displacement = this.setDisplacement();
		const x = this.setXaxis(displacement);
		const y = this.setYaxis(x, displacement);
		const coordinates = this.setOrientation(x, y);

		return coordinates;

	}

	setDisplacement() {

		// Get a random hypotenuse displacement value.

		const i = this.Pin.Helper.randomise({max: this.steps - 1});
		const displacement = this.displacement[i];

		return displacement;

	}

	setXaxis(displacement) {

		// Generate a random x value for the right angle triangle (so that we
		// now have width and hypotenuse data).

		return this.Pin.Helper.randomise({max: Math.floor(displacement)});

	}

	setYaxis(x, displacement) {

		// With the width (x) and hypotenuse data we can use Pythagoras to
		// calculate the height (y) value of the right angle triangle.

		return Math.sqrt(Math.pow(displacement, 2) - Math.pow(x, 2));

	}

	setOrientation(...coordinates) {

		// With the x, y values now calculated we randomise their orientation by
		// turning them positive and negative independent from each other. This
		// gives the dots a nice spread around the entire canvas circumference.

		for (let i = 0; i < coordinates.length; i +=1) {

			let center = this.Pin.center;

			coordinates[i] = this.Pin.Helper.boolean() ? center += coordinates[i] : center -= coordinates[i];

		}

		return {
			x: coordinates[0],
			y: coordinates[1]
		};

	}

	setAngle() {

		// Sets the dots trajectory angle. This is different from its initial
		// placement as it ties into the movement animation. This gives the Dot
		// an intial direction in which to build its trajectory from (between 0
		// and 359 degrees).

		return this.Pin.Helper.randomise({max: 359});

	}

	setSpeed() {

		// Randomises a speed that persists for each dot thought its lifecycle.
		//
		// NOTE: The minimum dot speed must always exceed the rings animation
		// increment. If not the a dot instance can get caught in the “dead
		// zone” (outside of the rings relevance area) with no way to get back
		// ahead of the transition speed again (this causes an infinite loop).

		const speed = Math.random() + 1;

		return this.Pin.Helper.round(speed);

	}

	setSteps() {

		// Randomises the current step value of the Dot. This is a value that
		// will decrease ever time a dot moves (-=1 per animation loop). Once it
		// hits zero a new angle is given to the particular dot to change its
		// trajectory. Step values are also reset if a dot hits the ring edge
		// and needs to have its trajectory angle forcibly updated to keep it
		// within the set bounds.

		return this.Pin.Helper.randomise({min: 10, max: 40});

	}

	setColor() {

		return this.Pin.Helper.boolean() ? '#13B5EA' : '#0D85AB';

	}

};

module.exports = Generate;
