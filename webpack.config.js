const CONFIG = require('./webpack');

module.exports = {
  entry: './src/frontend/js/app.js',
  output: {
    path: './public',
    publicPath: CONFIG.publicPath,
    filename: 'bundle.js?[hash]'
  },
  devtools: 'inline-source-map',
  module: {
    loaders: CONFIG.loaders
  },
  plugins: CONFIG.plugins,
  node: {
    fs: 'empty'
  },
  eslint: {
    configFile: './.eslintrc',
    failOnError: CONFIG.eslint.failOnError
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    port: 8000,
  }
};
