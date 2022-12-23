import path from 'node:path';

import { merge } from 'webpack-merge';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

import { common } from './webpack.common.js';

const babelPlugin = [
  ['transform-remove-console', { exclude: ['error', 'warn'] }],
  'transform-remove-debugger',
];

// eslint-disable-next-line no-underscore-dangle
const __dirname = process.cwd();

const pordConfig = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].[hash:8].js',
    clean: true,
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: babelPlugin,
        },
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: (content, loaderContext) => {
                const { resourcePath } = loaderContext;
                if (!resourcePath.endsWith('base.scss')) {
                  return `@import '@/assets/scss/function.scss'; @import '@/assets/scss/config.scss'; ${content}`;
                }
                return content;
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: ['...', new CssMinimizerPlugin()],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html', '**/.DS_Store'],
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
    }),
  ],
});
export default pordConfig;
