const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

// application source directory
const APP_NAME = 'app';

// application build directory
const BUILD_DIR = 'build';

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

  /**
   * Application entry point
   * https://webpack.js.org/configuration/entry-context/#entry
   *
   */
  entry: {
    'polyfills' : './polyfills.ts',
    'vendors' : './vendors.ts',
    'app': './main.ts'
  },

  /**
   * Application output
   * https://webpack.js.org/configuration/output/
   *
   */
  output: {
    /**
     * Output directory path where webpack bundles everything
     * https://webpack.js.org/configuration/output/#output-path
     */
    path: __dirname + '/' + BUILD_DIR,

    /**
     * Output file template
     * This option determines the name of each output bundle.
     * The bundle is written to the directory specified by the output.path option.
     * https://webpack.js.org/configuration/output/#output-filename
     * [name] - using entry key name
     */
    filename: '[name].bundle.js'
  },


  /**
   * Modules configuration
   * https://webpack.js.org/configuration/module/
   *
   */
  module: {
    rules: [
      /**
       * In order to compile Angular typescript files and Angular templates
       * https://github.com/s-panferov/awesome-typescript-loader
       * https://github.com/TheLarkInn/angular2-template-loader
       *
       */
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

      /**
       * Raw loader to load html files as a string
       */
      {
        test: /\.html$/,
        loader: 'raw'
      }
    ]
  },

  /**
   * Plugins to customize webpack build process
   * https://webpack.js.org/configuration/plugins/
   */
  plugins: [

    /**
     * HtmlWebpackPlugin
     *
     * This is a webpack plugin that simplifies creation of HTML files to serve your webpack bundles.
     * This is especially useful for webpack bundles that include a hash in the filename which changes every compilation.
     * https://github.com/ampedandwired/html-webpack-plugin
     */
    new HtmlWebpackPlugin({
      template: './index.ejs',
      title: 'Angular 2 - Webpack minimal',
      inject: 'body'
    }),

    /**
     * CommonsChunkPlugin
     *
     * When multiple bundles share some of the same dependencies, it extract those dependencies
     * into a shared bundle to avoid duplication.
     * https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
     *
     */
     new  webpack.optimize.CommonsChunkPlugin({
         name: ['app', 'vendor', 'polyfills']
     }),


    /**
     * ContextReplacementPlugin
     *
     * To provide context to Angular's use of System.import
     * Angular issue report: https://github.com/angular/angular/issues/11580
     */
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      __dirname
     )
  ],

  /**
   * Webpack devServer setup
   *
   * https://webpack.js.org/configuration/dev-server/#devserver
   */
  devServer: {
       contentBase: "./" + BUILD_DIR,
       port: 3000
    }
}