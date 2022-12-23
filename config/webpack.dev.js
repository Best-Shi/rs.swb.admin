import pkg from 'webpack';

import { merge } from 'webpack-merge';
import 'webpack-dev-server';

import { common } from './webpack.common.js';

import { bsConfig } from '../bs.config.js';

const { DefinePlugin } = pkg;

const devConfig = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: bsConfig.servicePort,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          'style-loader',
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
  plugins: [
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true,
    }),
  ],
});

export default devConfig;
