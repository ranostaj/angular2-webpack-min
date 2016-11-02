const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


module.exports = {

   context: __dirname + "/app",
  resolve: {
    extensions: ['.ts', '.min.js', '.js', '.json', '.scss'],
    modules: [__dirname + "/app", 'node_modules'],
  },
  entry: {
    'polyfills' : './polyfills.ts',
    'vendors' : './vendors.ts',
    'app': './main.ts'
  },

  output: {
    path: __dirname + '/build',
    filename: '[name].bundle.js',
    publicPath: 'http://localhost:9000'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader','angular2-template-loader'],
        exclude: [/node_modules/]
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Angular 2 - Webpack minimal',
      inject: 'body'
    }),
     new  webpack.optimize.CommonsChunkPlugin({
         name: ['app', 'vendor', 'polyfills']
     })
  ],

    devServer: {
        outputPath: __dirname + "/build",
        port: 9000
    }
}