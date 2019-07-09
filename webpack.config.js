const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "demo/index.html"),
  filename: "./index.html"
});

module.exports = {
  entry: path.join(__dirname, "demo/index.js"),
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'] },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] }
    ]
  },
  plugins: [htmlWebpackPlugin],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'poui.js',
    library: 'poui',
    libraryTarget: 'umd',
    publicPath: '/',
    umdNamedDefine: true
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '0.0.0.0' // for tryout with the browser of an actual mobile device
  }
};
