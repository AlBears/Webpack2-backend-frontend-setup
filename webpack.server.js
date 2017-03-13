var path = require('path'),
	nodeExternals = require('webpack-node-externals'),
	webpack = require("webpack");


function createConfig(isDebug) {
	const plugins = [];

	if (!isDebug) {
		plugins.push(new webpack.optimize.UglifyJsPlugin());
	}


	//---------------------------
	//WEBPACK Config
	return {
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
		externals: [nodeExternals()],
		plugins: plugins
	};
}

module.exports = createConfig(true);
//module.exports.create = createConfig;
