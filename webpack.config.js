const path = require("path");
const webpack = require("webpack");

//单独抽离css的插件
const miniCssExtractPlugin = require("mini-css-extract-plugin");

//单独抽离html插件
const htmlWebpackPlugin = require("html-webpack-plugin");

//定时清理dist旧文件
const cleanWebpackPlugin = require("clean-webpack-plugin");

//深度抖tree
const deepTreeShaking = require("webpack-deep-scope-plugin").default;

module.exports = {
    entry: {
        realize: "./src/js/entity_class/game.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "./js/[name].js"
    },
    mode: "development",
    module: {
        rules: [
            //解析es6
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            //解析less
            {
                test: /\.less$/,
                use: [miniCssExtractPlugin.loader ,"css-loader", "less-loader"]
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                    options: {
                        attrs:['img:src']
                    }
                }
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[name][hash:6].[ext]",
                            //限定大小，　超出后给压缩为base64格式
                            limit: 1000000000,
                            // 压缩后的输出路径
                            outputPath: "img"
                        }
                    },
                    //定义压缩ｉｍｇ的loader
                    {
                        loader: "img-loader",
                        options: {
                            plugin:[
                                //专门压缩各种图片的插件
                                require('imagemin-gifsicle')({
                                    interlaced: false
                                }),
                                require('imagemin-mozjpeg')({
                                    progressive: true,
                                    arithmetic: false
                                }),
                                require('imagemin-pngquant')({
                                    floyd: 0.5,
                                    speed: 2,
                                    // 定义压缩图片的质量
                                    quality:[0.4, 0.6]
                                }),
                                require('imagemin-svgo')({
                                    plugins: [
                                        { removeTitle: true },
                                        { convertPathData: false }
                                    ]
                                })
                            ]
                        }
                    }
                ]
            } 
        ]
    },
    devServer: {
        port: 9999,
        contentBase: path.resolve(__dirname, "dist")
    },
    plugins: [
        // 使用抽离css的插件
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        new miniCssExtractPlugin({
            path: path.resolve(__dirname, "dist"),
            filename: "./css/[name].css"
        }),
        new htmlWebpackPlugin({
            template: "./src/html/index.html",
            filename: "./html/index.html",
            minify: {
                removeComments: true,
                // collapseWhitespace: true
            },
            hash: true,
            inject: true
        }),
        // new cleanWebpackPlugin(),
        new deepTreeShaking() 
    ]
}