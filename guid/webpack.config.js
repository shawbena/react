let path = require('path');
let webpack = require('webpack');
let Merge = require('webpack-merge');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');

let common = {
    entry: {
        app: './src/app.tsx'
    },
    module: {
        rules: [
            {
                // all files with a '.ts' or '.tsx' extension will be handled by
                // 'awesome-typescript-loader'
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }, {
                // all output '.js' files will have any sourcemaps re-processed by
                // 'source-map-loader'
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({title: 'Higher Order Component',
        filename: 'index.html',
        template: './src/index.ejs',
    })
    ],
    resolve:{
        extensions: ['.ts', '.tsx', '.js', '.json']
    } 
};
let development = Merge(common, {
    output: {
        filename: './dist/[name][chunkhash].bundle.js',
        sourceMapFilename: './dist/[name][chunkhash].map'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './'
    }
});

let production = Merge(common, {
    output: {
        filename: './dist/[name].min.js',
        sourceMapFilename: './dist/[name].min.map'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack
            .optimize
            .UglifyJsPlugin({
                beautify: false,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true
                },
                comments: false
            })
    ]
});
// development or production
module.exports = development;