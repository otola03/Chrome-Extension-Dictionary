const path = require('path');

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
  // No plugins needed since using a proxy server
  plugins: [],
};
