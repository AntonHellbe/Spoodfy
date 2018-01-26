const path = require('path');
const autoprefixer = require('autoprefixer'); //eslint-disable-line

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
            use: [
            {
                loader: 'style-loader'
            },
            {
                loader: 'css-loader'
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: function() { //eslint-disable-line
                        return [autoprefixer];
                    }
                }
            },
            {
                loader: 'sass-loader'
            }
            ]
        },
        {
            test: /\.(png|jpg)$/,
            use: [
                { loader: 'url-loader?limit=250000' }
            ]
        }
    ]
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