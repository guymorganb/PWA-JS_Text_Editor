/*
using the webpack-merge utility to merge our common configuration with development-specific settings. 
We've set the mode to development, added source maps, and configured the webpack-dev-server.
*/
const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const { InjectManifest } = require('workbox-webpack-plugin');
module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',   // source map is a tool that assists with debuggin
    devServer: {
    static: path.join(__dirname, 'dist'),
    },
    plugins: [
        // Inject a precache manifest into a custom service worker
        new InjectManifest({
            swSrc: './src-sw.js', // Source file for the custom service worker
            swDest: 'src-sw.js', // Destination for the new service worker with the manifest
        })
    ],
});
