const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


module.exports = {

  //context: __dirname + "/app",
  resolve: {
    extensions: ['.ts', '.js', '.json', '.scss'],
    modules: [__dirname + "/app", 'node_modules']
  },
  entry: {
    'polyfills' : './app/polyfills.ts',
    'vendors' : './app/vendors.ts',
    'app': './app/main.ts'
  },

  output: {
    path: __dirname + '/build',
    filename: '[name].bundle.js'
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
        loader: 'raw'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.html',
      title: 'Angular 2 - Webpack minimal',
      inject: 'body'
    }),
     new  webpack.optimize.CommonsChunkPlugin({
         name: ['app', 'vendor', 'polyfills']
     }),
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      __dirname + '/app' // location of your src
    ),

  ],

    devServer: {
        contentBase: "./build"
    }
}