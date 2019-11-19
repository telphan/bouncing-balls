export default {
	ball: {
		mass: 30,
		color: 'black',
	},
	global: {
		gravity: {
			accelaration: 0.981,
		},
		friction: {
			// This will be transformed into negative accelaration in the code
			accelaration: 0.006,
		},
		ground: {
			width: 5,
		},
	},
};
