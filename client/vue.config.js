var ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  },
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new ManifestPlugin({
      	fileName: __dirname + '/../server/public/mix-manifest.json',
      	publicPath: 'http://localhost/lq/client/dist/',
      })
    ]
  }
}