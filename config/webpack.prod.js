const path = require("path")
const EslintWebpackPlugin = require("eslint-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
// const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin")


const getStyleLoader = (pre) => {
    return [
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
            //处理css兼容性问题
            //配合package.json中 browserslist来指定兼容性
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: ["postcss-preset-env"]
                }
            }
        },
        pre
    ].filter(Boolean)
}

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "static/js/[name].[contenthash:10].js",//根据chunk名称
        chunkFilename: "static/js/[name].[contenthash:10].chunk.js",
        assetModuleFilename: "static/media/[hash:10][ext][query]",
        clean: true,
    },
    module: {
        rules: [
            //css
            {
                test: /\.css$/,
                use: getStyleLoader()
            },
            //less
            {
                test: /\.less$/,
                use: getStyleLoader("less-loader")
            },
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoader("sass-loader")
            },
            {
                test: /\.styl$/,
                use: getStyleLoader("stylus-loader")
            },
            //图片
            {
                test: /\.(jpe?g|png|gif|webp|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,//转为base64
                    }
                },
            },
            //处理其他资源
            {
                test: /\.(woff2?|ttf)/,
                type: "asset/resource",//原封不动资源
            },
            //js
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, "../src"),
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,

                }
            }

        ]
    },
    plugins: [
        new EslintWebpackPlugin({
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules",
            cache: true,
            cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache"),
            //多进程打包，不要轻易用
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash:10].css",
            chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../public"),
                    to: path.resolve(__dirname, "../dist"),
                    globOptions: {
                        // 忽略index.html 文件
                        ignore: ["**/index.html"]
                    }
                },
            ]
        })
    ],
    mode: "production",
    devtool: "source-map",
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}.js`,
        },
        minimizer: [
            //压缩css
            new CssMinimizerWebpackPlugin(),
            //压缩js
            new TerserWebpackPlugin(),
            //压缩图片
            // new ImageMinimizerPlugin({
            //     minimizer: {
            //         implementation: ImageMinimizerPlugin.imageminGenerate,
            //         options: {
            //             plugins: [
            //                 ["gifsicle", { interlaced: true }],
            //                 ["jpegtran", { progressive: true }],
            //                 ["optipng", { optimizationLevel: 5 }],
            //                 [
            //                     "svgo",
            //                     {
            //                         plugins: [
            //                             "preset-default",
            //                             "prefixIds",
            //                             {
            //                                 name: "sortAttrs",
            //                                 params: {
            //                                     xmlnsOrder: "alphabetical",
            //                                 },
            //                             },
            //                         ],
            //                     },
            //                 ],
            //             ],
            //         },
            //     },
            // }),
        ]
    },
    //webpack 解析模块加载选项
    resolve: {
        // 自动补全文件拓展名
        extensions: [".jsx", ".js", ".json"]
    },
}