//const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//var HtmlWebpackPlugin = require('html-webpack-plugin');

var HtmlWebpackPlugin = require('html-webpack-plugin');
// var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var path = require('path');

var publicUrl = '/public';


const WebpackConfig = {
    entry:{
        runHeaderTitleAndVideo: path.resolve(__dirname,'./runHeaderTitleAndVideo.js'),
        staticCountEffect: path.resolve(__dirname,'./staticCountEffect.js'), 
    },
    output: {
        path: path.resolve(__dirname, 'built'),
        filename: 'bundle.[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,

                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {

                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader:'file-loader',
                        options:{
                            name: '[name].[ext]',
                            // outputPath: "./images/backgroundImage",
                            // publicPath: './images/backgroundImage',
                        }
                    }
                ]
            }
        ]
    },

    devServer:{
        contentBase:path.resolve(__dirname,'built'),
    }
}



module.exports = WebpackConfig;
