const webpack = require('webpack');
const path = require('path');
const lessToJs = require('less-vars-to-js');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const BASE_OUTPUT = path.join(__dirname, 'lib');
const libraryName = 'sixsense-js';

const themeVariables = lessToJs(fs.readFileSync(
  path.join(__dirname, 'src/styles/ant-default-vars.less'),
'utf8'));

const config = {
  entry: {
    index: './src/index.js',
    components: './src/components/index.js',
    HOCS: './src/HOCS/index.js',
    utils: './src/utils/index.js',
  },
  mode: 'production',
  output: {
    path: BASE_OUTPUT,
    filename: '[name].js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  resolve: {
    modules: ['node_modules', 'src'],
    alias: {
      moment$: 'moment/moment.js',
    },
    extensions: ['.js'],
  },
  externals: [nodeExternals()],
  devtool: false,
};

config.plugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new webpack.NamedModulesPlugin(),
  new MiniCssExtractPlugin({ filename: '[name].css' }),
];

config.module = {
  noParse: /moment\.js/,
  rules: [
    {
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/,
      include: path.join(__dirname, 'src'),
    },
    {
      test: /\.(jpg|png|gif)$/,
      use: 'file-loader',
    },
    {
      test: /\.ico$/,
      use: 'file-loader?name=[name].[ext]',
    },
    {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        },
      ],
    },
    {
      test: /\.scss$/,
      use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]--[hash:base64:5]',
              minimize: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                  path: './postcss.config.js'
              }
            }
          },
          { loader: 'sass-loader' },
      ],
    },
    {
      test: /\.css$/,
      include: /node_modules/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            minimize: true,
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: './postcss.config.js',
            }
          }
        },
        { loader: 'sass-loader' },
      ],
    },
    {
      test: /\.less$/,
      include: /node_modules/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        {
          loader: 'less-loader',
          options: {
            modifyVars: themeVariables,
            javascriptEnabled: true,
          },
        },
      ]
    },
  ]
};

module.exports = config;
