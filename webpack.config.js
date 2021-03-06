const path = require('path')
const webpack = require('webpack')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const isProdEnvironment = (process.env.NODE_ENV === 'production')

function dynamicEntry(entry) {
  if (isProdEnvironment) return entry

  return process.env.ADD_REACT_DEVTOOLS ? ['react-devtools', entry] : entry
}

module.exports = {
  cache:   true,
  devtool: isProdEnvironment ? false : 'cheap-module-source-map',

  context: __dirname,

  entry: {
    app:     dynamicEntry('./src/Application.jsx'),
    options: dynamicEntry('./src/Options.jsx'),
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'common',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: (function configurePlugins() {
    let plugins = [
      new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
      new LodashModuleReplacementPlugin(),
    ]

    if (process.env.ANALYZE_WEBPACK_BUNDLE) {
      plugins = [
        ...plugins,
        new BundleAnalyzerPlugin(),
      ]
    }

    return plugins
  }()),
}
