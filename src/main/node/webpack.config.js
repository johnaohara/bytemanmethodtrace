const path = require("path")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require("glob")
const fs  = require('fs')

const favicon = "data:image/jpeg;base64,"+fs.readFileSync(path.resolve(__dirname,"public/favicon.ico")).toString('base64');

//TODO fails to load webfonts correctly
//may need to use a custom build of patternfly4 with cdn?
module.exports = {
  entry: {//|ttf|woff|woff2|ico|jpg|jpeg|png|svg    
    "bundle.js": glob.sync("build/static/?(js|css|media)/*.?(js|css|ico)").map(f => path.resolve(__dirname, f)),
  },
  output: {
    path: __dirname + '/../resources',
    filename: "build/static/js/[name].min.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      { 
        test: /\.(jpe?g|png|ttf|eot|ico|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        exclude: path.resolve(__dirname, "node_modules"),
        use: ['base64-inline-loader']
        
      }
    ],
  },
  plugins: [
      /*new UglifyJsPlugin()*/
      new HtmlWebpackPlugin({
        inlineSource: '.(js|css)$', // embed all javascript and css inline
        template: './public/index.template.html',
        inlineFavicon: favicon,
        //favicon: "./public/favicon.ico",
    }),
      new HtmlWebpackInlineSourcePlugin()
    ],
}