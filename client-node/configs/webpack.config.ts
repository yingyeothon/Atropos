import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin';

const configurationFactory: webpack.ConfigurationFactory = (
  env,
  args,
): webpack.Configuration => ({
  entry: {
    index: './src/web/index.ts',
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'content/bundle/[name].bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
})

export default configurationFactory
