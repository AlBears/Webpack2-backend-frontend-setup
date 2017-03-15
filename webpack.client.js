var path = require('path'),
	webpack = require('webpack'),
	ExtractTextPlugin = require("extract-text-webpack-plugin");

const dirname = path.resolve('./'),
	vendorModules = ["jquery", "lodash"];

function createConfig(isDebug) {
	const devTool = isDebug ? "eval-source-map" : "source-map";
	const plugins = [new webpack.optimize.CommonsChunkPlugin({
		name: "vendor",
		filename: "vendor.js"
	})];

	const cssLoader = {
		test: /\.css$/,
		use: [{
			loader:'style-loader'
		}, {
			loader:'css-loader'
		}],
		exclude: /node_modules/
	};
	const sassLoader = {
		test: /\.scss$/,
		use: [{
			loader: "style-loader"
		}, {
			loader: "css-loader"
		}, {
			loader: "sass-loader"
		}]
	};
	const appEntry = ['./src/client/application.js'];

	if (!isDebug) {
		plugins.push(new webpack.optimize.UglifyJsPlugin());
		plugins.push(new ExtractTextPlugin('[name].css'));

		cssLoader.use = ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: 'css-loader'
		});

		sassLoader.use = ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: ['css-loader', 'sass-loader']
		});
	} else {
		plugins.push(new webpack.HotModuleReplacementPlugin());
		appEntry.splice(0, 0, "webpack-hot-middleware/client");
	}
	//--------------------
	//WEBPACK CONFIG
	return {
		devtool: devTool,
		entry: {
			application: appEntry,
			vendor: vendorModules
		},
		output: {
			path: path.join(dirname, "public", "build"),
			filename: "[name].js",
			publicPath: "/build/"
		},
		resolve: {
			alias: {
				shared: path.join(dirname, 'src', 'shared')
			}
		},
		module: {
			rules: [
				{
					enforce: "pre",
					test: /\.js$/,
					exclude: /node_modules/,
					loader: "eslint-loader",
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: "babel-loader",
				},
				{
					test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg|woff2)$/,
					exclude: /node_modules/,
					loader: "url-loader?limit=1024",
				},
				cssLoader,
				sassLoader
			],
		},
		plugins: plugins
	};
	//-------------------
}

module.exports = createConfig;
