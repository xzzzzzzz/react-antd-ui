const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackBar = require("webpackbar");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        loader: "postcss-loader",
        options:{
            //css兼容性配置
            postcssOptions: {
                plugins: [
                    [ 
                        require('postcss-preset-env')()
                    ]
                ]
            }
        }
    }
];
module.exports = {
  entry: path.join(__dirname, "../components/index.js"),
  output: {
    path: path.resolve(__dirname, "../lib"),
    filename: "raui.js",
    library: "raui",
    libraryTarget: "umd",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...commonCssLoader],
      },
      {
        test: /\.less$/,
        use: [...commonCssLoader,"less-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["url-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [
	new MiniCssExtractPlugin({
		  filename:'index.css'
	}),
	new OptimizeCssAssetsWebpackPlugin(),
    new WebpackBar(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "lib 创建 library",
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
  // 不属于内部的库, 外部的
    externals: {
      react: {
        commonjs: "react",
        commonjs2: "react",
        amd: "react",
        root: "React",
      },
      "react-dom": {
        commonjs: "react-dom",
        commonjs2: "react-dom",
        amd: "react-dom",
        root: "ReactDOM",
      },
    }
};
