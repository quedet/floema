const path = require("path")
const Webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const IS_DEVELOPMENT = process.env.NODE_ENv === 'development'

const dirApp = path.resolve(__dirname, 'app')
const dirStyles = path.resolve(__dirname, 'styles')
const dirShared = path.resolve(__dirname, 'shared')

module.exports = {
    entry: [
        path.join(dirApp, 'index.js'),
        path.join(dirStyles, 'index.scss')
    ],
    resolve: {
        modules: [
            dirApp,
            dirShared,
            dirStyles
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [ new TerserWebpackPlugin]
    },
    plugins: [
        new Webpack.DefinePlugin({
            IS_DEVELOPMENT
        }),
        new Webpack.ProvidePlugin({

        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'shared',
                    to: ''
                }
            ]
        }),
        new CleanWebpackPlugin
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: ''
                        }
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['postcss-preset-env']
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jpe?g|svg|webp|gif|woff2?|fnt)$/i,
                use: {
                    loader: 'file-loader'
                }
            },
            {
                test: /\.(glsl|vert|frag)$/,
                use: {
                    loader: 'raw-loader'
                }
            },
            {
                test: /\.(glsl|vert|frag)$/,
                use: {
                    loader: 'glslify-loader'
                }
            }
        ]
    }
}