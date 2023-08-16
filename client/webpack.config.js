// Import required plugins and libraries
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
    // Specify the build mode. 'production' mode will minify the code for optimal load times
    mode: 'production',
    
    // Entry points for the application. Here we have two: 'main' and 'install'
    entry: {
        main: './src/js/index.js',
        install: './src/js/install.js'
    },
    
    // Define how the output files should be named and where they should be located
    output: {
        filename: '[name].js', // Use the entry names as file names. E.g., 'main.js' and 'install.js'
        path: path.resolve(__dirname, 'dist'), // Place the output files in a 'dist' directory
    },
  
    // Define loaders and options for processing different types of files
    module: {
        rules: [
            {
                // Use babel-loader for JavaScript files
                test: /\.js$/, // Match all .js files
                exclude: /node_modules/, // Do not transpile files in node_modules
                loader: 'babel-loader', // Use babel-loader for transpilation
                options: {
                    plugins: ['@babel/plugin-syntax-dynamic-import'], // Enable dynamic imports in Babel
                }
            },
            {
                // Process CSS files
                test: /\.css$/, // Match all .css files
                use: [
                    MiniCssExtractPlugin.loader, // Extracts CSS into separate files
                    'css-loader' // Resolves CSS imports and loads them
                ]
            }
        ],
    },
    
    // Array of plugins to be applied to the build
    plugins: [
        new CleanWebpackPlugin(), // Clean the 'dist' directory before each build
        
        // Generate an HTML file that includes references to the bundled assets
        new HtmlWebpackPlugin({
            template: './index.html', // Template file to use as base
            title: 'Webpack Plugin', // Set the title for the generated HTML file
        }),
        
        new MiniCssExtractPlugin(), // Initialize the plugin for extracting CSS
        
        // Inject a precache manifest into a custom service worker
        new InjectManifest({
            swSrc: './src-sw.js', // Source file for the custom service worker
            swDest: './dist/sw.js', // Destination for the new service worker with the manifest
            globDirectory: './dist', // Directory to look in for files to be precached
            globPatterns: ['**/*.js', '**/*.css', '**/*.svg', '**/*.html'] // Patterns of files to precache
        })
    ],
};
