import path from 'node:path';

import pkg from 'webpack';

import { VueLoaderPlugin } from 'vue-loader';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import EslintWebpackPlugin from 'eslint-webpack-plugin';

import { bsConfig } from '../bs.config.js';

const { DefinePlugin, ProvidePlugin } = pkg;

// eslint-disable-next-line no-underscore-dangle
const __dirname = process.cwd();

export const common = {
  context: path.resolve(__dirname),
  entry: './src/main.js',
  resolve: {
    alias: {
      '@': '/src',
      '@img': '/src/assets/images',
      '@utils': '/src/utils',
      '@comp': '/src/components',
    },
    extensions: ['.vue', '.js', '.jsx', '...'],
  },
  experiments: {
    topLevelAwait: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/i,
        loader: 'vue-loader',
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
        type: 'asset',
        generator: {
          filename: 'media/[name].[hash:8][ext]',
        },
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
        type: 'asset',
        generator: {
          filename: 'images/[name].[hash:8][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset',
        generator: {
          filename: 'fonts/[name].[hash:8][ext]',
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new DefinePlugin({
      BASE_URL: '"./"',
      MODULES: JSON.stringify(process.env.npm_config_modules || ''),
    }),
    new ProvidePlugin({
      Bs: [path.resolve(__dirname, './src/utils/index.js'), 'default'],
    }),
    new HtmlWebpackPlugin({
      title: bsConfig.webTitle,
      template: './public/index.html',
    }),
    new EslintWebpackPlugin({
      extensions: ['js', 'jsx', 'vue'],
      quiet: true,
    }),
  ],
};
