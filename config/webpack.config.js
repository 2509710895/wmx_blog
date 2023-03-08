const path = require("path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const aliasPath = require("../tsconfig.json").compilerOptions.paths;
// const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin")

// 获取cross-env 定义的环境变量
const isProduction = process.env.NODE_ENV === "production";

const getStyleLoader = (pre) => {
  return [
    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
    "css-loader",
    {
      //处理css兼容性问题
      //配合package.json中 browserslist来指定兼容性
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["postcss-preset-env"],
        },
      },
    },
    pre && {
      loader: pre,
      options:
        pre === "less-loader"
          ? {
              //antd 主题色配置
              // 主题色文档
              lessOptions: {
                modifyVars: { "@primary-color": "#1DA57A" },
                javascriptEnabled: true,
              },
            }
          : {},
    },
  ].filter(Boolean);
};

module.exports = {
  entry: "./src/main.js",
  output: {
    path: isProduction ? path.resolve(__dirname, "../dist") : undefined,
    filename: isProduction
      ? "static/js/[name].[contenthash:10].js"
      : "static/js/[name].js", //根据chunk名称
    chunkFilename: isProduction
      ? "static/js/[name].[contenthash:10].chunk.js"
      : "static/js/[name].chunk.js",
    assetModuleFilename: "static/media/[hash:10][ext][query]",
    clean: true,
    publicPath: "/",
  },
  module: {
    rules: [
      //css
      {
        test: /\.css$/,
        use: getStyleLoader(),
      },
      //less
      {
        test: /\.less$/,
        use: getStyleLoader("less-loader"),
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoader("sass-loader"),
      },
      {
        test: /\.styl$/,
        use: getStyleLoader("stylus-loader"),
      },
      //图片
      {
        test: /\.(jpe?g|png|gif|webp|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, //转为base64
          },
        },
      },
      //处理其他资源
      {
        test: /\.(woff2?|ttf)/,
        type: "asset/resource", //原封不动资源
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
            !isProduction && "react-refresh/babel", //激活 js 的HMR功能
          ].filter(Boolean),
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],
      },
    ],
  },
  plugins: [
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
      cache: true,
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
      //多进程打包，不要轻易用
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    isProduction &&
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash:10].css",
        chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
      }),
    isProduction &&
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "../public"),
            to: path.resolve(__dirname, "../dist"),
            globOptions: {
              // 忽略index.html 文件
              ignore: ["**/index.html"],
            },
          },
        ],
      }),
    !isProduction && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? "source-map" : "cheap-module-source-map",
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        //react react-dom react-router-dom 一起打包成一个js文件
        react: {
          test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
          name: "chunk-react",
          priority: 40,
        },
        //antd 单独打包
        antd: {
          test: /[\\/]node_modules[\\/]antd[\\/]/,
          name: "chunk-antd",
          priority: 30,
        },
        //剩下的node_modules 单独打包
        lib: {
          test: /[\\/]node_modules[\\/]/,
          name: "chunk-libs",
          priority: 20,
        },
      },
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}.js`,
    },
    // 是否需要压缩
    minimize: isProduction,
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
    ],
  },
  //webpack 解析模块加载选项
  resolve: {
    // 自动补全文件拓展名
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    alias: Object.keys(aliasPath).reduce((alias, key) => {
      alias[key] = path.resolve(aliasPath[key][0]) + "";
      return alias;
    }, {}),
  },
  devServer: {
    host: "localhost",
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true, //解决前端路由404问题
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        pathRewrite: { "^/api": "" },
        changeOrigin: true, // target是域名的话，需要这个参数，
        secure: false, // 设置支持https协议的代理
      },
    },
  },
  performance: false, //关闭性能分析，提升打包速度
};
