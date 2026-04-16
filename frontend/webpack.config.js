const path = require('path')
const fs = require('fs')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const baseDir = __dirname
const srcDir = path.resolve(baseDir, 'src')
const buildDir = path.resolve(baseDir, 'build')

// Get entry points as directory-names under src/pages
function getEntry() {
  const pages = fs.readdirSync(path.join(baseDir, 'src/pages')).filter((file) => {
    return fs.statSync(path.join(baseDir, 'src/pages', file)).isDirectory()
  })
  const entry = {}
  for (const page of pages) {
    const file = path.resolve(baseDir, `src/pages/${page}/index.ts`)
    if (fs.existsSync(file)) {
      entry[page] = file
    }
  }
  return entry
}

// Get html files under /src in order to move them to ../main/resources/templates
function getHtmlWebpackPlugin() {
  const htmlFiles = glob.sync(path.resolve(baseDir, 'src/**/*.html'))
  const entry = []
  for (const file of htmlFiles) {
    entry.push(
      new HtmlWebpackPlugin({
        inject: false,
        filename: `templates/${file.replace(/.*frontend\/src\//, '')}`,
        template: file,
      })
    )
  }
  return entry
}



module.exports = {
  entry: getEntry(),
  output: {
    path: buildDir,
    filename: 'static/pages/[name]/index.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@src': srcDir,
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...getHtmlWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/pages/[name]/index.css',
    }),
  ],
};