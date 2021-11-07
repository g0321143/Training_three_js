const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: `./src/index.js`,
  
    // ファイルの出力設定
    output: {
      //  出力ファイルのディレクトリ名
      path: `${__dirname}/dist`,
      // 出力ファイル名
      filename: "main.js"
    },

    // 下記の”　”の中のモード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: "development",
    
    module: {
        rules: [
          {
            test: /\.css/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: { url: false }
              }
            ]
          }
        ]
    },
      // ES5(IE11等)向けの指定
    target: ["web", "es5"],

    // ローカル開発用環境を立ち上げる
    // 実行時にブラウザが自動的に localhost を開く
    devServer: {
        static: "dist",
        open: true
    },


    plugins: [
        // THREE.Scene などの形式で three.js のオブジェクトを使用できるようにします。
        new webpack.ProvidePlugin({
            'THREE': 'three/build/three'
        }),
        // HTMLの自動生成
        new HtmlWebpackPlugin({
            hash: true,
            filename: "index.html",
            template: "./src/template.html",
            title: "Three.js Demo"
          }),
        // minify するようにします。(必要な場合)
        // minfiyとはJavaScriptやCSSのコード内の不要な改行やインデントを削除して、動作はそのままの状態で、圧縮・軽量化すること
        //new webpack.optimize.UglifyJsPlugin()
    ]

  };