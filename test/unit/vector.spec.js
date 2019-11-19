import 'mocha';

import { expect } from 'chai';

import Vector from '../../src/lib/vector';

describe('Vector', () => {
	it('should create correct default values', () => {
		const vector = new Vector();
		expect(vector.x).to.be.equal(0);
		expect(vector.y).to.be.equal(0);
		// eslint-disable-next-line no-unused-expressions
		expect(vector.limit).to.be.undefined;
	});

	it('should correctly calculate magnitue', () => {
		const set = [
			{ vector: new Vector(1, 1), result: Math.sqrt(2) },
			{ vector: new Vector(3, 4), result: 5 },
		];

		for (const element of set) {
			expect(element.vector.magnitude()).to.be.equal(element.result);
		}
	});

	it('should correctly add another vector to it', () => {
		const vector = new Vector();

		const set = [
			{
				vector: new Vector(5, 8),
				result: {
					x: 5,
					y: 8,
				},
			},
			{
				vector: new Vector(-2, 13),
				result: {
					x: 3,
					y: 21,
				},
			},
			{
				vector: new Vector(8, -25),
				result: {
					x: 11,
					y: -4,
				},
			},
		];

		for (const element of set) {
			vector.add(element.vector);
			expect(vector.x).to.be.equal(element.result.x);
			expect(vector.y).to.be.equal(element.result.y);
		}
	});

	it('should correctly multiply a scalar', () => {
		const vector = new Vector(1, 1);

		const set = [
			{
				scalar: {
					x: -1,
					y: -1,
				},
				result: {
					x: -1,
					y: -1,
				},
			},
			{
				scalar: {
					x: -5,
					y: -8,
				},
				result: {
					x: 5,
					y: 8,
				},
			},
			{
				scalar: {
					x: 5,
					y: 3,
				},
				result: {
					x: 25,
					y: 24,
				},
			},
		];

		for (const element of set) {
			vector.mulX(element.scalar.x);
			expect(vector.x).to.be.equal(element.result.x);
			vector.mulY(element.scalar.y);
			expect(vector.y).to.be.equal(element.result.y);
		}
	});

	it('should respect the limit set when we try to surpass it', () => {
		const vectorDefinition = { x: 1, y: 1, limit: 1 };

		const vector = new Vector(
			...['x', 'y', 'limit'].map((key) => vectorDefinition[key])
		);

		vector.add(vector);

		for (const element of ['x', 'y', 'limit'].map((key) => [
			key,
			vector[key],
		])) {
			expect(element[1]).to.be.equal(vectorDefinition[element[0]]);
		}
	});

	it('should not respect the limit when we are under it', () => {
		const vectorDefinition = { x: 1, y: 1, limit: 3 };

		const vector = new Vector(
			...['x', 'y', 'limit'].map((key) => vectorDefinition[key])
		);

		vector.add(vector);

		for (const element of ['x', 'y'].map((key) => [key, vector[key]])) {
			expect(element[1]).to.be.equal(vectorDefinition[element[0]] * 2);
		}

		expect(vector.limit).to.be.equal(vectorDefinition.limit);
	});
});
