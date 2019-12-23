// [样式表配置]
module.exports = ({ config, options = {} }) => {
  const rootOptions = options
  const isProd = process.env.NODE_ENV === 'production'
  const getAssetPath = require('../util/getAssetPath')
  const {
    sourceMap = false,
    loaderOptions = {},
    extract = true,
    needInlineMinification = true,
    isCssModule = false
  } = rootOptions.css || {}

  const createCSSRule = (lang, test, loader, options = {}) => {
    const baseRule = config.module.rule(lang).test(test)
    const normalRule = baseRule.oneOf('normal')
    const cssnanoOptions = {
      preset: ['default', {
        mergeLonghand: false,
        cssDeclarationSorter: false
      }]
    }
    if (rootOptions.productionSourceMap && sourceMap) {
      cssnanoOptions.map = { inline: false }
    }

    const filename = getAssetPath(
      rootOptions,
      `css/[name]${rootOptions.filenameHashing ? '.[contenthash:8]' : ''}.css`
    )
    const extractOptions = Object.assign({
      filename,
      chunkFilename: filename
    }, extract && typeof extract === 'object' ? extract : {})

    const cssPublicPath = '../'.repeat(
      extractOptions.filename
        .replace(/^\.[\/\\]/, '')
        .split(/[\/\\]/g)
        .length - 1
    )

    applyLoaders(normalRule, isCssModule)

    function applyLoaders (rule, isCssModule) {
      const cssLoaderOptions = Object.assign({
        sourceMap
      }, loaderOptions.css)
      if (extract) {
        rule
          .use('extract-css-loader')
          .loader(require('mini-css-extract-plugin').loader)
          .options({
            hmr: !isProd,
            publicPath: cssPublicPath
          })
      } else {
        // rule
        //   .use('vue-style-loader')
        //   .loader(require.resolve('vue-style-loader'))
        //   .options({
        //     sourceMap
        //   })
      }
      if (isCssModule) {
        cssLoaderOptions.modules = {
          localIdentName: '[name]_[local]_[hash:base64:5]',
          ...cssLoaderOptions.modules
        }
      } else {
        delete cssLoaderOptions.modules
      }

      rule
        .use('css-loader')
        .loader(require.resolve('css-loader'))
        .options(cssLoaderOptions)

      if (needInlineMinification) {
        rule
          .use('cssnano')
          .loader(require.resolve('postcss-loader'))
          .options({
            sourceMap,
            plugins: [require('cssnano')(cssnanoOptions)]
          })
      }

      rule
        .use('postcss-loader')
        .loader(require.resolve('postcss-loader'))
        .options(Object.assign({ sourceMap }, loaderOptions.postcss))

      if (loader) {
        let resolvedLoader
        try {
          resolvedLoader = require.resolve(loader)
        } catch (error) {
          resolvedLoader = loader
        }
        rule
          .use(loader)
          .loader(resolvedLoader)
          .options(Object.assign({ sourceMap }, options))
      }
    }
  }
  const defaultSassLoaderOptions = {}
  return () => {
    createCSSRule('css', /\.css$/, 'css-loader')
    createCSSRule('postcss', /\.p(ost)?css$/)
    createCSSRule('scss', /\.scss$/, 'sass-loader', Object.assign(
      {},
      defaultSassLoaderOptions,
      loaderOptions.scss || loaderOptions.sass
    ))

    createCSSRule('sass', /\.sass$/, 'sass-loader', Object.assign(
      {},
      defaultSassLoaderOptions,
      loaderOptions.sass,
      {
        sassOptions: Object.assign(
          {},
          loaderOptions.sass && loaderOptions.sass.sassOptions,
          {
            indentedSyntax: true
          }
        )
      }
    ))

    createCSSRule('less', /\.less$/, 'less-loader', loaderOptions.less)

    createCSSRule('stylus', /\.styl(us)?$/, 'stylus-loader', Object.assign({
      preferPathResolver: 'webpack'
    }, loaderOptions.stylus))
  }
}
