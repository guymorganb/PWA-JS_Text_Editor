const {merge} = require('webpack-merge');
const {common} = require('./webpack.common.js');
const { InjectManifest } = require('workbox-webpack-plugin');
// we are merging the webpack.common.js into the webpack.prod.js for the production environment
// this upholds separation of concerns
module.exports = merge(common, {
    mode: 'production',
    plugins: [
        // Inject a precache manifest into a custom service worker
        new InjectManifest({
            swSrc: './src-sw.js', // Source file for the custom service worker
            swDest: './dist/sw.js', // Destination for the new service worker with the manifest
            globDirectory: './dist', // Directory to look in for files to be precached
            globPatterns: ['**/*.js', '**/*.css', '**/*.svg', '**/*.html'] // Patterns of files to precache
        })
    ],
});
