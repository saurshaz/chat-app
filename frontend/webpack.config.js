
const path = require('path');
const config = {
  entry: {
    app: [
      './src/index.jsx',
    ],
  },

  output: {
    path: path.resolve(__dirname, 'backend', 'static'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'es2015',
                'stage-0',
                'react',
              ],
              plugins: [
                'syntax-jsx',
                'transform-react-jsx',
                // 'react-hot-loader/babel'
              ],
            },
          },
        ],
      }, {
        test: /\.css/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [
                  require('precss'),
                  require('autoprefixer'),
                ];
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin()
  ],
};

module.exports = config;
