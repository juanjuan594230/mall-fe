const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getHtmlConfig = function(name) {
  return {
    template: './src/view/'+ name +'.html',
    filename: 'view/'+ name +'.html',
    inject: true,
    hash: true,
    chunks: ['common', name]
  }
}

const config = {
  entry: {
    'index': './src/page/index/index.js',
    'login': './src/page/login/index.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'js/[name].js'  // 占位符，以源文件的名字为打包好的文件的名字
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,  // 不转义node_modules目录下的js代码
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
        /* use: [
          'style-loader',
          'css-loader'
        ] */
      },
      {
        test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resource/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  externals: {
    'jquery': 'window.jQuery'
  },
  plugins: [
    // 提取公共模块，将其打包到dist/js/base.js  path是在output中配置的
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'
    }),
    new ExtractTextPlugin('css/[name].css'),
    // html模板处理
    // new HtmlWebpackPlugin({
    //   template: './src/view/index.html',
    //   filename: 'view/index.html',
    //   inject: true,
    //   hash: true,
    //   chunks: ['common', 'index']
    // })
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('login')),
  ]
}

module.exports = config;