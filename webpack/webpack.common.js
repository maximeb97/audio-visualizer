const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development", // TODO: Create build-dev to handle separetly
    devtool: 'source-map', // TODO: Create build-dev to handle separetly
    optimization: { // TODO: Create build-dev to handle separetly
        minimize: false
    },
    entry: {
        index: path.resolve(__dirname, "..", "src", "index.js"),
        inject: path.resolve(__dirname, "..", "src", "inject.js"),
        indexBrowser: path.resolve(__dirname, "..", "src", "Browser", "indexBrowser.js"),
        serviceWorker: path.resolve(__dirname, "..", "src", "serviceWorker.js"),
    },
    output: {
        path: path.join(__dirname, "../build"),
        filename: "[name].js",
    },
    resolve: {
        extensions: [".jsx", ".js"],
    },
    module: {
        rules: [{
                test: /\.(js|jsx)/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: [
                        "@babel/preset-env",
                        ["@babel/preset-react", {
                            "runtime": "automatic"
                        }]
                    ]
                }
            },
            {
                test: /\.(sass|less|css)$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.svg$/,
                issuer: /\.[jt]sx?$/,
                use: ["@svgr/webpack", "url-loader"],
            }
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{
                from: ".",
                to: ".",
                context: "public"
            }]
        }),
    ],
};