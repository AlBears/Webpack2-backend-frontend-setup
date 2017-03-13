var path = require('path'),
	nodeExternals = require('webpack-node-externals');


function createConfig() {
	return {

		//WEBPACK Config
		target: "node",
		devtool: "source-map",
		entry: './src/server/server.js',
		output: {
			path: path.join(__dirname, 'build'),
			filename: 'server.js'
		},
		resolve: {
			alias: {
				shared: path.resolve(__dirname, 'src/shared')
			}
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					use: [
						{ loader: "babel-loader" },
						{ loader: "eslint-loader" }
					],
					exclude: [/node_modules/]
				},
			]
		},
		externals: [nodeExternals()]
	};
}

module.exports = createConfig(true);
//module.exports.create = createConfig;
