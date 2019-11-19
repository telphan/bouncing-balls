import 'mocha';
import { expect } from 'chai';
import { stub } from 'sinon';

import Ball from '../../src/lib/ball';

const CANVAS = {
	width: 100,
	height: 100,
};

describe('Ball', () => {
	let ball;
	let randomStub;

	before(() => {
		randomStub = stub(Math, 'random').returns(0.00001);

		ball = new Ball();
	});

	it('should always speed up until it hits the ground', () => {
		let magnitude = ball.speed.magnitude();
		// We are checking for nearly 0 as the speed will not settle on 0
		for (; ball.speed.y > 0; ball.tick(CANVAS.width, CANVAS.height)) {
			expect(ball.speed.magnitude()).to.be.gte(magnitude);
			magnitude = ball.speed.magnitude();
		}
	});

	it('should always speed down after it hits the ground', () => {
		let magnitude = ball.speed.magnitude();

		// We are checking for nearly 0 as the speed will not settle on 0
		for (; ball.speed.y < 0; ball.tick(CANVAS.width, CANVAS.height)) {
			expect(ball.speed.magnitude()).to.be.lte(magnitude);
			magnitude = ball.speed.magnitude();
		}
	});

	it('should always jump lower each time, until it nearly settles on the ground', () => {
		randomStub.returns(0.001);
		ball = new Ball();
		const condition = (cond) => {
			return cond ? ball.speed.y > 0 : ball.speed.y < 0;
		};
		let falling = true;
		let position = ball.pos.y;

		do {
			// We need the ball to reach its apex again
			for (let i = 0; i < 2; ++i) {
				for (
					let j = condition(falling);
					condition(falling);
					j = condition(falling)
				) {
					ball.tick(CANVAS.width, CANVAS.height);

					if (j !== condition(falling)) {
						break;
					}
				}

				falling = !falling;
			}

			expect(ball.pos.y).to.be.gt(position);
			position = ball.pos.y;
		} while (ball.speed.magnitude() > 0.2);
	});
});
