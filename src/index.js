import config from './config';

import './../styles/index.css';
import Ball from './lib/ball';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const balls = [];

/**
 * Draw a ball on our context
 * @param {Ball} ball - Object to be drawn
 */
const drawBall = (ball) => {
	ctx.beginPath();
	ctx.arc(ball.pos.x, ball.pos.y, ball.radius, 0, 2 * Math.PI, false);
	ctx.fillStyle = ball.color;
	ctx.fill();
	ctx.stroke();
};

/**
 * Render our canvas
 */
const render = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < balls.length; ++i) {
		drawBall(balls[i]);
		balls[i].tick(canvas.height + config.global.ground.width);

		if (balls[i].teardown(canvas.width)) {
			balls.splice(i, 1);
		}
	}
};

/**
 * Resize canvas size with document resize
 */
const resizeCanvasToBody = () => {
	canvas.height = document.body.clientHeight - config.global.ground.width;
	canvas.width = document.body.clientWidth;
	render();
};

canvas.className = 'canvas';
canvas.setAttribute(
	'style',
	`border-bottom-width: ${config.global.ground.width}px`
);
canvas.addEventListener('click', (event) => {
	balls.push(new Ball(event.clientX, event.clientY));
});
window.addEventListener('resize', resizeCanvasToBody, false);

document.body.appendChild(canvas);
resizeCanvasToBody();

setInterval(render, 20);
