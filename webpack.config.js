module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'eslint-loader',
			},
			{
				test: /\.js$/,
				loader: 'prettier-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
};
