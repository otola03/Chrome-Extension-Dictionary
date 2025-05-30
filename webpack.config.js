const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  entry: {
    background: './src/background.js',
    'content-script': './src/content-script.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      // for background.js proxy thing, but not used here.
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
    }),
  ],
};
