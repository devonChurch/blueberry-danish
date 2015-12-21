const $ = require('jquery');

const Movement = class {

	// Updates the dots properties on an per animation loop basis.

	constructor(Pin, Dots) {

		this.Pin = Pin;
		this.Dots = Dots;
		this.angles = this.generateAngles();

	}

	generateAngles() {

		// Originally each dot had its angle procedurally generated on the fly -
		// this was unfortunately too CPU heavy for the amount of dots needed
		// for this execution. Instead now on load we calculate each x,y
		// displacement scenario for every degree in a 360 scope and store them
		// in an array. This makes it far more performant to retreive a dots
		// displacement per animation cycle as the heavy lifting is cached in
		// the “angle” reference.

		let angles = [];

		for (let i = 0; i < 90; i += 1) {

			const offset = this.calculateOffset(i);

			angles = this.reflectQuadrants(i, angles, offset.x, offset.y);

		}

		return angles;

	}

	reflectQuadrants(i, angles, x, y) {

		// Instead of looping around the full 360 degrees and performing the
		// appropriate trig calculations we instead speed things up by focusing
		// on the only positive x,y 90 degree quadrant on the canvas and then
		// reflect those displacement references over onto the other remaining
		// quarters.
		//
		//   (4)     |     (1)
		//    -x, +y | +x, +y
		//           |
		//   -------(c)--------
		//           |
		//    -x, -y | +x, -y
		//   (3)     |     (2)
		//
		// (1) = Original calculations are done here
		// (c) = Canvas center (0, 0)

		angles[i + (90 * 0)] = {x, y}; // (1)
		angles[i + (90 * 1)] = {x, y: y * -1}; // (2)
		angles[i + (90 * 2)] = {x: x * -1, y: y * -1}; // (3)
		angles[i + (90 * 3)] = {x: x * -1, y}; // (4)

		return angles;

	}

	calculateOffset(i) {

		// We know the current angle (i = position i the 360 degree for loop)
		// and we know the hypotenuse (1px = the ratio that the dots speed
		// variable will multiple on). With those two bits of information we can
		// use Trigonometry to find the x, y (width, height of the right angle
		// triangle).

		const degrees = this.Pin.Helper.convertToRadians(i);
		const x = Math.sin(degrees);
		const y = Math.cos(degrees);

		return {
			x: this.Pin.Helper.round(x),
			y: this.Pin.Helper.round(y)
		};

	}

	updateDotProperties() {

		// Updates each dot instance with new x, y values and queries it current
		// step / reference properties.

		const instances = this.Dots.instances;

		for (let i = 0; i < this.Dots.total; i += 1) {

			const instance = instances[i];
			let updates = this.scrutiniseRelevance(instance);

			// if the relevance needed to be rectified then force steps update!
			updates.steps = this.updateSteps(instance.steps, updates.redirect);
			updates.reference = updates.redirect || updates.steps.reset ? this.updateAngle(instance.reference, updates.redirect) : instance.reference;

			instances[i] = {
				x: this.Pin.Helper.round(updates.x),
				y: this.Pin.Helper.round(updates.y),
				reference: updates.reference,
				speed: instance.speed,
				steps: updates.steps.value,
				color: instance.color,
				anomaly: instance.anomaly
			};

		}

		this.Dots.instances = instances;

	}

	updateSteps(value, redirect) {

		// Decrease the “step” count by one per animation loop. If the dot
		// needed to be redirected as result of exceeding its bounds then force
		// the steps to reset.

		value -= 1;
		const reset = value < 0;
		value = reset || redirect ? this.Dots.Generate.setSteps() : value;

		return {
			value,
			reset
		};

	}

	updateAngle(reference, redirect) {

		// Update the current angle reference for either a normal trajectory
		// change (a small angle offset) or a when a dot has exceeded its bounds
		// (a large angle offset).

		const min = redirect ? 30 : 10;
		const max = redirect ? 45 : 25;
		const i = this.Pin.Helper.randomise({min, max});
		// Randomises which way the angle offset will deviate.
		reference = this.Pin.Helper.boolean() ? reference -= i : reference += i;

		// If the angle reference falls outside of the 0 - 359 angle
		// circumference then loop the reference back around in a seamless
		// manner.
		if (reference >= 360) {

			reference = reference - 360;

		} else if (reference < 0) {

			reference = 360 - (reference * -1);

		}

		return reference;

	}

	updateTrajectory(i, reference, x, y, speed) {

		// Gets the “proposed” new x, y displacement (these values still need to
		// pass the relevance checks) based on the current angle reference.

		const angle = this.angles[reference];
		x = angle.x < 0 ? x -= (angle.x * speed * -1) : x += (angle.x * speed);
		y = angle.y < 0 ? y -= (angle.y * speed * -1) : y += (angle.y * speed);

		return {x, y};

	}

	scrutiniseRelevance(instance) {

		// Update the dots current x, y values while making sure it new location
		// still resides with in the relevant area of its set bounds. Depending
		// on the dots anomaly status there will be different relevance
		// parameters to query against.

		const anomaly = instance.anomaly ? 'canvas' : 'icon';
		let reference = instance.reference;
		let coordinates;
		let hypotenuse;
		let i = 0;

		do {

			// If this is the first time through the while loop then the dot has
			// yet to exceed its bounds so we keep the same trajectory angle
			// reference. If NOT then we need to generate a new angle to test
			// against as the last one was not deemed irrelevant.
			reference = i === 0 ? reference : this.updateAngle(reference, true);
			// Update the x, y trajectory based on the current reference set above.
			coordinates = this.updateTrajectory(i, reference, instance.x, instance.y, instance.speed);
			hypotenuse = this.calculateHypotenuse(coordinates.x, coordinates.y);

			i += 1;

	} while(this[`${anomaly}Relevance`](coordinates.x, coordinates.y, hypotenuse));

		return {
			x: coordinates.x,
			y: coordinates.y,
			// How many times did the trajectory get resolved (more than one ===
			// the dot hit a bounding perimeter and needed to have its angle
			// reset).
			redirect: i > 1,
			reference
		};

	}

	canvasRelevance(x, y, hypotenuse) {

		// The relevance check for dots with { anomaly: true } (makes sure the
		// dots reside in the canvas maximum radius).

		return hypotenuse > this.Pin.center;

	}

	iconRelevance(x, y, hypotenuse) {

		// The relevance check for dots with { anomaly: fase } (makes sure the
		// dots reside in the pin icon’s shape elements).

		return !this.Pin.Shape.Ring.testRelevance(hypotenuse) &&
               !this.Pin.Shape.Circle.testRelevance(hypotenuse) &&
               !this.Pin.Shape.Triangle.testRelevance(x, y);

	}

	calculateHypotenuse(x, y) {

		// The hypotenuse is used to cross reference against circular bounding
		// areas i.e. (the Shape “Ring” and “Circle” Class). The value is taken
		// from the centre of the canvas (the origin point for the Shape’s
		// circular elements).

		const center = this.Pin.center;
		const width = x > center ? x - center : center - x;
		const height = y > center ? y - center : center - y;

		return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

	}

};

module.exports = Movement;
