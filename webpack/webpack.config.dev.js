var path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {merge} = require("webpack-merge")
const common = require("./webpack.config.common")
const TerserPlugin = require("terser-webpack-plugin");

const webpack_config = merge(common,
    {
        mode: 'development',
        entry: './example/main.ts',
        output: {
            path: path.resolve(__dirname, '../docs'),
            filename: 'build-example.js',
            clean: true,
            publicPath: '/vue-erdjs/'
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                title: 'Vue Erd example App',
                template: path.resolve(__dirname, '../example/template.html'),
                showErrors: true
            })
        ],
        devServer: {
            client: {
                overlay: {
                    errors: true,
                    warnings: false,
                },
            },
            historyApiFallback: {
                index: '/vue-erdjs/index.html'
            },
        },
        devtool: 'inline-source-map'
    }
)

if (process.env.BUILD_TARGET === 'github') {
    webpack_config.optimization = {
        minimize: true,
            usedExports: false,
            minimizer: [
            new TerserPlugin({
                include: /\.js$/,
                extractComments: false,
                terserOptions: {
                    output: {
                        comments: false,
                    },
                }
            }),
        ]
    }
}

module.exports = webpack_config;
