const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');

const modeConfig = env => require(`./build-utils/webpack.${env.mode}.js`)(env);

module.exports = env => {
  return webpackMerge(
    {
      mode: env.mode,
      plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
          title: 'SWAPI promise exercises',
          template: 'src/index.html',
          favicon: 'static/images/favicons/favicon.png'
        })
      ]
    },
    modeConfig(env)
  );
};
