const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  context: __dirname + "/app",
  resolve: {
    extensions: ['', '.ts', '.min.js', '.js', '.json', '.scss']
  },
  entry: {
    'app': './main.ts',
    'polyfills' : './polyfills.ts'
  },

  output: {
    path: __dirname + '/build',
    filename: '[name].bundle.js',
    publicPath: '/'
  },

  module: {
    loaders: [

      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
        exclude: [/node_modules/]
      }

    ]

  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body'
    })
  ],


  devServer: {
    contentBase: './app'
  }

}