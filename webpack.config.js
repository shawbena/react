const path = require('path');
const webpack = require("webpack");
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const apps = require('./apps');

const commonConfig = {
    devtool: 'cheap-source-map',
    // context: '',
    // entry:{},
    output: {
        // publicPath: '/',
        // path: path.resolve(__dirname, 'build'),
        filename: 'scripts/[name].js',
        chunkFilename: 'scripts/[name].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
            use: {
                loader: 'file-loader?',
                options: {
                    outputPath: 'assets/'
                }
            }
        }, {
            test: /\.s?css$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }]
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        })
    ]
};

const configs = apps.map((app) => {
    let dir, entry, plugins;
    if (typeof app === 'string') {
        if (!app) {
            throw new Error('app dirname cannot be empty');
        }
        dir = app;
        entry = path.resolve(__dirname, app);
        plugins = [new HtmlWebpackPlugin({
            title: app
        })];
    } else {
        if (typeof app.dir !== 'string' || !app.dir) {
            throw new Error('app dir not exit or not typeof string');
        }

        dir = app.dir;

        if (!app.entry) {
            entry = path.resolve(__dirname, app.dir);
            plugins = [
                new HtmlWebpackPlugin({
                    title: app.title || app.dir
                })
            ];
        } else {
            if (typeof app.entry === 'string') {
                entry = entry = path.resolve(__dirname, app.dir, app.entry);;
                plugins = [
                    new HtmlWebpackPlugin({
                        title: app.title || app.dir
                    })
                ];
            } else if (app.entry instanceof Array) {
                if (typeof app.dir !== 'string') {
                    throw new Error('app dir not exit or not typeof string');
                }
                // empty string item for 'index.js'
                entry = app.entry.map((item) => (path.resolve(__dirname, app.dir, item)));
                plugins = [
                    new HtmlWebpackPlugin({
                        title: app.title || app.dir
                    })
                ];
            } else {
                let appEntrys = Object.keys(app.entry);
                if (!app.entry || !appEntrys.length) {
                    throw new Error('you should provide a app with entrys');
                }
                if (appEntrys.indexOf('app') < 0) {
                    throw new Error('"app" entry is required');
                }
                // app.entry : key:value pairs
                entry = {};
                appEntrys.forEach((item) => {
                    entry[item] = path.resolve(__dirname, app.dir, app.entry[item]);
                });
                plugins = appEntrys.map((item) => {
                    return new HtmlWebpackPlugin({
                        title: item === 'app' ? (app.title || app.dir) : app.entry[item],
                        filename: item === 'app' ? 'index.html' : `${app.entry[item]}/index.html`,
                        chunks: [item, 'common']
                    })
                });
            }
        }
    }

    return merge(commonConfig, {
        entry,
        output: {
            publicPath: `/${dir}/`,
            path: path.resolve('build', dir)
        },
        plugins
    })
});

module.exports = configs;