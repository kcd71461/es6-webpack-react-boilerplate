import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import path from 'path';

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production'),
    __DEV__: false
};

export default {
    devtool: 'source-map',
    entry: './src/index',
    target: 'web',
    output: {
        path: `${__dirname}/dist`,
        publicPath: './',
        filename: '[name].[chunkhash].js'
    },
    plugins: [
        new WebpackMd5Hash(),

        new webpack.DefinePlugin(GLOBALS),

        new ExtractTextPlugin('[name].[contenthash].css'),

        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true
        }),

        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?name=[name].[ext]'},
            {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]"},
            {test: /\.ttf(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=[name].[ext]'},
            {test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]'},
            {test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[ext]'},
            {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
            {
                test: /(\.css|\.scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve('./src'), "node_modules"
        ]
    }
};