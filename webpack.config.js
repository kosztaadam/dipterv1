var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './index.js'
  ],
  entry: './bundleEntry.js',
  output: { path: __dirname + '/static', filename: '/bundle.js' },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true)
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'react-hmre'],
        }
      }
    ]
  },
};
