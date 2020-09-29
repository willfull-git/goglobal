const path = require('path');

module.exports = {
   mode:   'development',
   entry:  './src/index.js',
   output: {
      filename: 'bundle.js',
      path:     path.join(__dirname, 'dist')
   },
   devServer: {
      contentBase: './dist'
   },
   devtool: 'inline-source-map',
   module: {
      rules: [
         {
            test: /\.js|jsx$/,
            exclude: /node_modules/,
            use: {
               loader: "babel-loader"
            }
         },
         {
            test: /\.css$/,
            loader: 'style-loader'
         },
         {
            test: /\.css$/,
            loader: 'css-loader',
            options: {
               modules: true
            }
         },
         {
            test: /\.(woff|woff2|eot|ttf)$/,
            use: [
               'file-loader'
            ]
         },
      ]
   }
}
