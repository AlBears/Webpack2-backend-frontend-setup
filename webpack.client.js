var path = require('path');
const dirname = path.resolve('./');

function createConfig(isDebug) {
	const devTool = isDebug ? "eval-source-map" : "source-map";
	const plugins = [];

	const cssLoader = { test: /\.css$/, use: ['style-loader', 'css-loader'], exclude: /node_modules/ };
	const sassLoader = { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'], exclude: /node_modules/ };
	const appEntry = ['./src/client/application.js'];

	//--------------------
	//WEBPACK CONFIG
	return {
		devtool: devTool,
		entry: {
			application: appEntry
		},
		output: {
			path: path.join(dirname, "public", "build"),
			filename: "client.js"
		},
		resolve: {
			alias: {
				shared: path.resolve(__dirname, 'src/shared')
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
					loader: "url-loader?limit=512",
				},
				cssLoader,
				sassLoader
			],
		},
		plugins: plugins
	};
	//-------------------
}

module.exports = createConfig(true);
//module.exports.create = createConfig;
