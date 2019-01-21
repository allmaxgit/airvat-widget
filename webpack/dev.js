const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FlowWebpackPlugin = require('flow-webpack-plugin');

const path = require('path');

const publicPath = null;

const eslint = {
  failOnError: false
};

const plugins = [
  new CleanPlugin(['public'], {
    root: path.resolve(__dirname, '../')
  }),
  new HtmlWebpackPlugin({
    title: 'Todo App',
    template: './src/frontend/html/index.html',
    hash: true
  }),
  new ExtractTextPlugin('styles.css?[contenthash]'),
  new FlowWebpackPlugin(),

];

const loaders = [
  {
    test: /\.jsx?$/,
    loaders: ['babel?presets[]=es2015,presets[]=react,presets[]=stage-2'],
    exclude: /node_modules/
  },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style', 'css!sass?sourceMap')
  },
  {
    test: /\.json$/,
    loaders: ['raw']
  },
  {
    test: /\.(jpg|png|svg)$/,
    loaders: ['file?name=[name].[ext]?[hash]']
  },
  {
    test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
    loaders: ['url?name=[name].[ext]?[hash]']
  },
  { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
  { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
];

module.exports = {
  publicPath,
  eslint,
  plugins,
  loaders
};
