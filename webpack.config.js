const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const mode = 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist'; 
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
  mode: "development",
  target,
  devtool,
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'), 
    },
    compress: true, 
    port: 8080, 
    open: true, 

  },
  entry: {
    main: ['@babel/polyfill', './coffee-house/src/index.js'],
    secondery: ['@babel/polyfill', './coffee-house/src/pages/menu/js/menu.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[name][ext]'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: './coffee-house/src/pages/home/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'menu.html',
      template: './coffee-house/src/pages/menu/menu.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new CopyPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname, './coffee-house/src/assets/images/'),
          to: path.resolve(__dirname, './dist/assets/images/'),
          noErrorOnMissing: true, 
        }
      ]
    })
  ],
  module: {   
    rules: [
        {
            test: /\.html$/i,
            loader: "html-loader",
        },
        {
            test: /\.(c|sa|sc)ss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                 "css-loader",
                 {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [require('postcss-preset-env')],
                        }  
                    }
                 },
                 "sass-loader"
            ],
        },
        {
            test:/\.woff2?$/i,
            type: 'asset/resource',
            generator: {
                filename: 'fonts/[name][ext]'
            }
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name][ext]',
          },
        },
        {
            test: /\.(?:js|mjs|cjs)$/i,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
        },
        {
          test: /\.json$/,
          type: 'asset/resource',
        },
    ],
  },
}; 

// const path = require('path'); // Импортируем модуль "path" для работы с путями файлов

// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// const mode = process.env.NODE_ENV || 'development';
// const devMode = mode === 'development';
// const target = devMode ? 'web' : 'browserslist'; 
// const devtool = devMode ? 'source-map' : undefined;

// module.exports = {
//   mode,
//   target,
//   devtool,
//   devServer: {
//     open: true,
//     hot: true,
//   },
//   entry: path.resolve("@babel/polyfill", __dirname, 'coffee-house', 'src', 'index.js'),
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     clean: true,
//     filename: '[name].[contenthash].js',
//     assetModuleFilename: 'assets/[name][ext]'
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       filename: "index.html",
//       template: path.resolve(__dirname, 'coffee-house', 'src', 'pages', 'home', 'index.html'),
//       // template: '../coffe-house/coffee-house/src/pages/home/index.html',
//     }),
//     new HtmlWebpackPlugin({
//       filename: 'menu.html',
//       template: path.resolve(__dirname, 'coffee-house', 'src', 'pages', 'menu', 'menu.html'),
//       // template: '../coffe-house/coffee-house/src/pages/menu/menu.html',
//     }),
//     new MiniCssExtractPlugin({
//       filename: '[name].[contanthash].css',
//     })
//   ],
//   module: {   
//     rules: [
//         {
//             test: /\.html$/i,
//             loader: "html-loader",
//         },
//         {
//             test: /\.(c|sa|sc)ss$/i,
//             use: [
//                 devMode ? "style-loader" : MiniCssExtractPlugin.loader,
//                  "css-loader",
//                  {
//                     loader: 'postcss-loader',
//                     options: {
//                         postcssOptions: {
//                             plugins: [require('postcss-preset-env')],
//                         }  
//                     }
//                  },
//                  "sass-loader"
//             ],
//         },
//         {
//             test:/\.woff2?$/i,
//             type: 'asset/resource',
//             generator: {
//                 filename: 'fonts/[name][ext]'
//             }
//         },
//             {
//             test:/\.(jpe?g|png|webp|gif|svg)$/i,
//             use: [
//                 {
//                 loader: 'image-webpack-loader',
//                 options: {
//                     mozjpeg: {
//                       progressive: true,
//                     },
//                     // optipng.enabled: false will disable optipng
//                     optipng: {
//                       enabled: false,
//                     },
//                     pngquant: {
//                       quality: [0.65, 0.90],
//                       speed: 4
//                     },
//                     gifsicle: {
//                       interlaced: false,
//                     },
//                     // the webp option will enable WEBP
//                     webp: {
//                       quality: 75
//                     }
//                 }
//                 }
//             ],
//             type: 'asset/resource',
//         },
//         {
//             test: /\.(?:js|mjs|cjs)$/i,
//             exclude: /node_modules/,
//             use: {
//               loader: 'babel-loader',
//               options: {
//                 presets: [
//                   ['@babel/preset-env', { targets: "defaults" }]
//                 ]
//               }
//             }
//         },
//     ],
//   },
// };