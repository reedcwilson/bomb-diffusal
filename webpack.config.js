let path = require('path'),
    webpack = require('webpack');

module.exports = {
  context: path.resolve('./'),
  entry: ['./index'],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  output: {
    path: path.resolve('./'),
    filename: 'bundle.js'
  },
  devtool: 'source-map'
};
