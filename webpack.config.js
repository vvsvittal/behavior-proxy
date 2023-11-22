const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
    entry: {
        index: "./src/index.js" // Changed from .tsx to .js
    },
    mode: "production",
    module: {
        rules: [
            {
              test: /\.jsx?$/, // Changed from .tsx? to .jsx?
              use: [
                {
                  loader: "babel-loader", // Changed from ts-loader to babel-loader
                }
              ],
              exclude: /node_modules/,
            },
            {
              exclude: /node_modules/,
              test: /\.css$/i,
              use: [
                "style-loader",
                "css-loader"
              ]
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "manifest.json", to: "../manifest.json" },
            ],
        }),
        ...getHtmlPlugins(["index"]),
    ],
    resolve: {
        extensions: [".jsx", ".js"], // Removed .tsx and .ts
    },
    output: {
        path: path.join(__dirname, "dist/js"),
        filename: "[name].js",
    },
};

function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
            new HTMLPlugin({
                title: "React extension",
                filename: `${chunk}.html`,
                chunks: [chunk],
            })
    );
}
