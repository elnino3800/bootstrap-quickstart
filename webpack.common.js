const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const VENDOR_LIBS = [
];

const config = {
    entry: {
        bundle: './src/index.ts',
        // vendor: VENDOR_LIBS
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module:{
        rules:[
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                use:'babel-loader',
                test: /\.js$/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader?sourceMap']
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader?sourceMap", // creates style nodes from JS strings
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader?sourceMap",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader', // Run postcss actions
                        options: {
                            plugins: function () { // postcss plugins, can be exported to postcss.config.js
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    "sass-loader?sourceMap" // compiles Sass to CSS, using Node Sass by default
                ]
            },

            {
                use:[
                    {
                        loader: 'url-loader',
                        options:{ limit:40000}
                    },
                    'image-webpack-loader'
                ],
                test:/\.(jpe?g|png|gif|svg)$/
            },
            {
                // ASSET LOADER
                // Reference: https://github.com/webpack/file-loader
                // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
                // Rename the file using the asset hash
                // Pass along the updated reference to your code
                // You can add here any file extension you want to get copied to your output
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file-loader'
            },
            {
                use:[
                    {
                        loader: 'url-loader',
                        options:{ limit:40000}
                    },
                    'image-webpack-loader'
                ],
                test:/\.(jpe?g|png|gif|svg)$/
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].[hash].css",
            chunkFilename: "[id].[hash].css"
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
        })
    ]
};

module.exports = config;