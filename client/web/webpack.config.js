const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rootDir = path.join(__dirname, '..');
const webpackEnv = process.env.NODE_ENV || 'development';

module.exports = function (env) {
  const publicPath = env && env.production ? '/appBuilder/' : '/';
  return {
    mode: webpackEnv,
    entry: {
      app: path.join(rootDir, './index.web.ts'),
    },
    output: {
      path: path.resolve(rootDir, 'dist'),
      filename: 'app-[hash].bundle.js',
      publicPath: publicPath, // needed for react-navigation in order to handle also deeper links (see https://stackoverflow.com/questions/39352703/webpack-historyapifallback-configuration-for-deep-routes)
    },
    devtool: 'source-map',
    // needed for react-navigation to show 'index.html' for any route, not only for main route
    devServer: {
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          loader: 'babel-loader',
          include: [
            path.resolve(rootDir, 'src'),
            // path.resolve(rootDir, 'node_modules'), // slower compilation
            path.resolve(rootDir, 'node_modules/react-native-vector-icons'),
            path.resolve(rootDir, 'node_modules/react-native-elements'),
            path.resolve(rootDir, 'node_modules/react-native-ratings'),
            path.resolve(rootDir, 'node_modules/react-native-safe-area-context'),
          ],
          options: {
            presets: ['module:metro-react-native-babel-preset'],
          },
        },
        // react-native-vector-icons (handle 'ttf' files using 'file-loader')
        {
          test: /\.(ttf|png)$/,
          loader: 'file-loader',
          include: [
            // path.resolve(rootDir, 'node_modules'), // slower compilation
            path.resolve(rootDir, 'node_modules/react-native-vector-icons'),
            path.resolve(rootDir, 'node_modules/react-native-elements'),
            path.resolve(rootDir, 'node_modules/react-native-ratings'),
            path.resolve(rootDir, 'node_modules/@react-navigation/stack'),
          ],
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, './index.html'),
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
      extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.jsx', '.web.js', '.jsx', '.js'], // read files in following order
      alias: Object.assign({
        'react-native$': 'react-native-web',
        'react-native-vector-icons$': 'react-native-vector-icons/dist',
      }),
    },
  };
};
