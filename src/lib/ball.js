import config from '../config';

import Vector from './vector';

/** Class representing a vector. */
export default class Ball {
	/**
	 * Create a vector.
	 * @param {number} [x = 0] - The x value. * @param {number} [y = 0] - The y value.
	 * @param {number} [radius = 5] - The radius of the bal
	 */

	constructor(x = 0, y = 0, radius = 5) {
		this.color = config.ball.color;

		this.pos = new Vector(x, y);
		this.radius = radius;

		const ballSpeedFactor =
			config.ball.mass * config.global.gravity.accelaration;

		this.speed = new Vector(
			ballSpeedFactor * Math.random() * (Math.random() < 0.5 ? 1 : -1),
			ballSpeedFactor * Math.random() * (Math.random() < 0.5 ? 1 : -1),
			ballSpeedFactor
		);

		this.friction = new Vector(
			-1 * Math.sign(this.speed.x) * config.global.friction.accelaration,
			-1 *
				Math.sign(this.speed.y) *
				config.global.friction.accelaration *
				60
		);
		this.gravity = new Vector(0, config.global.gravity.accelaration);
	}

	/**
	 * Tick ball, updating speed and position based on the forces we defined
	 * @param {number} [canvasHeight] - The height of the drawing area, used to know when we reached ground
	 */
	tick(canvasHeight) {
		const bottomY = canvasHeight - 2 * this.radius;

		this.speed.add(this.gravity);
		this.speed.add(this.friction);
		this.pos.add(this.speed);

		if (Math.sign(this.friction.x) === Math.sign(this.speed.x)) {
			this.friction.mulX(-1);
		}
		if (Math.sign(this.friction.y) === Math.sign(this.speed.y)) {
			this.friction.mulY(-1);
		}

		if (this.pos.y > bottomY) {
			this.pos.y = bottomY;
			this.speed.mulY(-1);
		}
	}

	/**
	 * Tick ball, updating speed and position based on the forces we defined
	 * This is used to know when the ball can no longer return to the drawing area
	 * @param {number} [canvasWidth] - The width of the drawing area
	 */
	teardown(canvasWidth) {
		return this.pos.x < 0 || this.pos.x > canvasWidth;
	}
}
