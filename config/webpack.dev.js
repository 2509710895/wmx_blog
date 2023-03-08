const path = require("path")
const EslintWebpackPlugin = require("eslint-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")

const getStyleLoader = (pre) => {
    return [
        "style-loader",
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
        path: undefined,
        filename: "static/js/[name].js",//根据chunk名称
        chunkFilename: "static/js/[name].chunk.js",
        assetModuleFilename: "static/media/[hash:10][ext][query]"
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
                    plugins: [
                        "react-refresh/babel",//激活 js 的HMR功能
                    ]
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
        new ReactRefreshWebpackPlugin(),//激活HMR
    ],
    mode: "development",
    devtool: "cheap-module-source-map",
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}.js`,
        },
    },
    //webpack 解析模块加载选项
    resolve: {
        // 自动补全文件拓展名
        extensions: [".jsx", ".js", ".json"]
    },
    devServer: {
        host: "localhost",
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true,//解决前端路由404问题
    }
}