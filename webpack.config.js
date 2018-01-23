const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
    },

    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        },
        {
            test: /\.s?css$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader']
        }]
    },

    devtool: 'cheap-module-source-map',

    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        contentBase: './public',
        historyApiFallback: true,
        host: '0.0.0.0'
    }
};