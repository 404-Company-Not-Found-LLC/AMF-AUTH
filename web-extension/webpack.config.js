const path = require('path');

module.exports = {
	mode: 'development', // or 'production'
	entry: './src/background.js', // Your main script
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'background.bundle.js', // Output file
	},
	resolve: {
		fallback: {
			crypto: require.resolve('crypto-browserify'),
			stream: require.resolve('stream-browserify'),
			buffer: require.resolve('buffer/'),
		},
	},
};
