const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: ['@babel/polyfill', path.join(__dirname, '../src/index')],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.()$/, // File extentions regExp which is like Font, etc.
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: './dist'
          }
        }
      },
      {
        test: /\.()$/, // Image extentions regExp
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]?[hash]', // File name or file hash value
            publicPath: './dist/', // File location over limit size after build
            limit: 10000 // File size limit : 10000byte
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ]
};

module.exports = config;
