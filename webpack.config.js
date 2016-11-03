const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


module.exports = {

  /**
   * Set out context directory
   */
  context: __dirname + "/app",

  resolve: {
    extensions: ['.ts', '.js', '.json', '.scss'],
    modules: [__dirname + "/app", 'node_modules']
  },


  entry: {
    'polyfills' : './polyfills.ts',
    'vendors' : './vendors.ts',
    'app': './main.ts'
  },

  output: {
    path: __dirname + '/build',
    filename: '[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['angular2-template-loader', 'awesome-typescript-loader'],
        exclude: [/node_modules/]
      },

      /**
       * Loading SASS styles to get it in a string format for Component styleUrls array
       * Notice we are not using style-loader here as Angular2 embeds styles directly into Components instead into <head>
       * This is done through ViewEncapsulation feature
       *
       */
      {
        test: /\.scss$/,
        use: ['raw', 'sass']
      },
      {
        test: /\.html$/,
        loader: 'raw'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.ejs',
      title: 'Angular 2 - Webpack minimal',
      inject: 'body'
    }),
     new  webpack.optimize.CommonsChunkPlugin({
         name: ['app', 'vendor', 'polyfills']
     }),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      __dirname
    )
  ],

    devServer: {
        contentBase: "./build"
    }
}