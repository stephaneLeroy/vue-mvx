var path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {merge} = require("webpack-merge")
const common = require("./webpack.config.common")

module.exports = merge(common,
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
