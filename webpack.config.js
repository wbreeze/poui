var path = require('path');

module.exports = {
  entry: 'src/index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        use: {
          loader: 'css-loader'
        }
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.css', '.js']
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  }
};
