let path = require('path');
let webpack = require("webpack");
let merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// apps for compile
const apps = [{
    dir: 'rending-elements',    // String: required
    title: 'Rending Elements',  // String: optional
    //relative to app dir
    entry: {                     // entry: String | Array, key:value pairs; key:value pairs for mutiple entry points
        app: 'index.js',
        tickClock: 'tick-clock'
    },
}, 'state-and-lifecycle', {
    dir: 'handling-events',
    entry: {
        app: '',
        bind: 'bind'
    }
}, {
    dir: 'conditional-rendering',
    entry: {
        app: '',
        'login-control': 'login-control',
        'prevent-component-from-rending': 'prevent-component-from-rending'
    }
}
];

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
            exclude: ['node_modules']
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

let configs = apps.map((app) => {
    if(typeof app === 'string'){
        return merge(commonConfig, {
            entry: path.resolve(__dirname, app),
            output: {
                publicPath: `/${app}/`,
                path: path.resolve('build', app)
            },
            plugins: [
                new HtmlWebpackPlugin({
                    title: app 
                }) 
            ]
        });
    }
    let entry, plugins;
    if(!app.entry){
        entry = path.resolve(__dirname, app.dir);
        plugins = [
            new HtmlWebpackPlugin({
                title: app.title || app.dir
            })
        ];
    }else if (typeof app.entry === 'string') {
        entry = entry = path.resolve(__dirname, app.dir, app.entry);;
        plugins = [
            new HtmlWebpackPlugin({
                title: app.title || app.dir
            })
        ];
    } else if (app.entry instanceof Array) {
        // empty string item for 'index.js'
        entry = app.entry.map((item) => (path.resolve(__dirname, app.dir, item)));
        plugins = [
            new HtmlWebpackPlugin({
                title: app.title || app.dir
            })
        ];
    } else {
        // app.entry : key:value pairs
        entry = {};
        Object.keys(app.entry).forEach((item) => {
            entry[item] = path.resolve(__dirname, app.dir, app.entry[item]);
        });
        plugins = Object.keys(app.entry).map((item) => {
            return new HtmlWebpackPlugin({
                title: item === 'app' ? (app.title || app.dir) : app.entry[item],
                filename: item === 'app' ? 'index.html' : `${app.entry[item]}/index.html`,
                chunks: [item, 'common']
            })
        });
    }

    return merge(commonConfig, {
        entry,
        output: {
            publicPath: `/${app.dir}/`,
            path: path.resolve('build', app.dir)
        },
        plugins
    })
});

module.exports = configs;