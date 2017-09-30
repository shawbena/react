const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },
    entry: {
        app: './CSSTranstionExample.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },{
                // all output '.js' files will have any sourcemaps re-processed by
                // 'source-map-loader'
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }, {
                test: /\.s[ac]ss$/,
                // use: ExtraTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: ['css-loader', 'sass-loader']
                // })
                //conpiles Sass to CSS, translates CSS into CommonJs, create style nodes from JS string
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Animation',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(['dist'])
    ]
};