//const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");

var path = require("path");

const { homePaths, aboutPaths } = require("./setting.js");

var publicUrl = "/public";

const dir = (tailPath) => {
  if (tailPath == "") {
    return path.resolve(__dirname);
  } else {
    return path.resolve(__dirname, tailPath);
  }
};

const WebpackConfig = {
  entry: {
    home: homePaths.map((path) => dir(path)),
    about: aboutPaths.map((path) => dir(path)),
  },
  output: {
    path: path.resolve(__dirname, "built"),
    filename: "bundle.[name].js",
  },
  // * hot reload for html file
  watch: true,
  resolve: { extensions: [".js", ".ts"] },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      chunks: ["home"],
    }),
    new HtmlWebpackPlugin({
      filename: "./about.html",
      chunks: ["about"],
    }),

    new CopyPlugin([
      { from: "src/css", to: "src/css" },
      { from: "assets", to: "assets" },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              //* get all image file from css export to built folder
              //   outputPath: "./assets/backgrounds",
              //   publicPath: "./assets",
            },
          },
        ],
      },
    ],
  },

  devServer: {
    contentBase: path.resolve(__dirname),
    // compress: true,
    // liveReload: true,
  },
};

module.exports = WebpackConfig;
