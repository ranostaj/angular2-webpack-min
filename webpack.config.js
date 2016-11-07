const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const APP_NAME = 'app';

module.exports = {

  /**
   * Set out context directory for resolving entry points and loaders from configuration.
   * https://webpack.js.org/configuration/entry-context/#context
   */
  context: __dirname + "/" + APP_NAME,

  /**
   * Resolve
   * Configure how modules are resolved.
   * https://webpack.js.org/configuration/resolve/#resolve
   */
  resolve: {

    /**
     * An array of extensions that should be used to resolve modules
     * https://webpack.js.org/configuration/resolve/#resolve-extensions
     */
    extensions: ['.ts', '.js', '.scss'],
    /**
     * Handle modules resolution, first looking through app resource, then node_modules
     * Tell webpack what directories should be searched when resolving modules.
     * https://webpack.js.org/configuration/resolve/#resolve-modules
     */
    modules: [__dirname + "/" + APP_NAME, 'node_modules']
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