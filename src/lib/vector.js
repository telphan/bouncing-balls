/** Class representing a vector. */
export default class Vector {
	/**
	 * Create a vector.
	 * @param {number} [x = 0] - The x value.
	 * @param {number} [y = 0] - The y value.
	 * @param {number} limit - The limit on magnitude, to prevent ifinite scale
	 */
	constructor(x = 0, y = 0, limit) {
		this.x = x;
		this.y = y;
		this.limit = limit;
	}

	/**
	 * Get vector's magnitude value.
	 * @return {number} Magnitude value.
	 */
	magnitude() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	/**
	 * Add a vector respecting the limit we set
	 * @param {Vector} - The vector to add.
	 */
	add(vector) {
		const oldX = this.x;
		const oldY = this.y;

		this.x += vector.x;
		this.y += vector.y;

		if (this.limit != null && this.magnitude() > this.limit) {
			this.x = oldX;
			this.y = oldY;
		}
	}

	/**
	 * Multiply X with a scalar
	 * @param {number} [x = 1] - The scalar value
	 */
	mulX(x = 1) {
		this.x *= x;
	}

	/**
	 * Multiply Y with a scalar
	 * @param {number} [y = 1] - The scalar value
	 */
	mulY(y = 1) {
		this.y *= y;
	}
}
