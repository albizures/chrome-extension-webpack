const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackChromeReloaderPlugin = require('webpack-chrome-extension-reloader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: {
    'popup.js': path.resolve(__dirname, 'src/popup.js')
  },
  output: {
    publicPath: '.',
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'popup.html'
    }),
    new ExtractTextPlugin({ filename: 'style.css' }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src/manifest.json'),
      flatten: true
    }]),
    process.env.NODE_ENV === 'development' ? new WebpackChromeReloaderPlugin() : null
  ].filter(plugin => !!plugin),
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js?$/,
      exclude: /node_modules/,
      use: 'eslint-loader'
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    }]
  }
}
