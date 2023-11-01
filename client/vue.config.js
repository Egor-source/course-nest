const {defineConfig} = require('@vue/cli-service')
const webpack = require('webpack');
const path = require('path')
const env = require('dotenv')
  .config({
    path: path.join(__dirname, '..', '.env'),
  }).parsed;

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin(Object.entries(env).reduce((acc, [key, value]) => {
        acc[`process.env.${key}`] = JSON.stringify(value);
        return acc
      }, {}))
    ]
  }
})
