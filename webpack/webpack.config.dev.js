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
            path: path.resolve(__dirname, '../_github'),
            filename: 'build-example.js',
            clean: true,
            publicPath: '/'
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
            static: [
                {
                    directory: 'dist'
                },
                {
                    directory: 'example'
                }
            ],
            client: {
                overlay: {
                    errors: true,
                    warnings: false,
                },
            },
            historyApiFallback: true,
        },
        devtool: 'inline-source-map'
    }
)
