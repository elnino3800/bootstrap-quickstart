const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: 'development',
    // devtool: 'inline-source-map',
    devtool: "source-map",
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        // new webpack.SourceMapDevToolPlugin({}),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
});