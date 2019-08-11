const path = require("path"),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    CopyWebpackPlugin = require("copy-webpack-plugin");


const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
};


module.exports = {
    externals: {
        paths: PATHS
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].css`
        }),
        new CopyWebpackPlugin([
            {
                from: `${PATHS.src}/img`, to: `${PATHS.assets}/img`
            }
        ]),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}/index.html`,
            filename: './index.html'
        })
    ],
    entry: {
        app: PATHS.src
    },
    output: {
        filename: `${PATHS.assets}js/[name].js`,
        path: PATHS.dist,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ["@babel/env", {
                            targets: {
                                edge: "17",
                                firefox: "60",
                                chrome: "67",
                                safari: "11.1",
                                ie: "10"
                            },
                        }]
                    ]
                }
            }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node-modules/'
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: `[name].[ext]`
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', 
                    MiniCssExtractPlugin.loader,   
                    {
                        loader: 'css-loader',
                        options: {sourceMap: true}
                    },
                    {
                        loader: 'postcss-loader',
                        options: {config: {path: './postcss.config.js'}}
                    },  
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    'style-loader', 
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                        options: {sourceMap: true} 
                    },
                    {
                        loader: 'postcss-loader',
                        options: {config: {path: 'src/js/postcss.config.js'}}
                    }, 
                    {
                        loader: 'sass-loader', 
                        options: {sourseMap: true}
                    }
                ]
            }
        ]
    }
};