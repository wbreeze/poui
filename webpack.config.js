const path = require('path');

module.exports = {
  entry: './index.html',
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
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/i,
        use: ['file-loader']
      }
    ]
  }
};
