// [加载资源 images、svg、media、fonts]
/**
 * @name assets
 * @description 加载资源 images、svg、media、fonts
 */
module.exports = ({
  config, webpackVersion, resolve, options
}) => () => {
  // const resolveLocal = require('../util/resolveLocal')
  const getAssetPath = require('../util/getAssetPath')
  const inlineLimit = 4096

  const genAssetSubPath = (dir) => getAssetPath(
    options,
    `${dir}/[name]${options.filenameHashing ? '.[hash:8]' : ''}.[ext]`
  )

  const genUrlLoaderOptions = (dir) => ({
    limit: inlineLimit,
    fallback: {
      loader: 'file-loader',
      options: {
        name: genAssetSubPath(dir)
      }
    }
  })

  config.module
    .rule('images')
    .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
    .use('url-loader')
    .loader(require.resolve('url-loader'))
    .options(genUrlLoaderOptions('img'))

  // do not base64-inline SVGs.
  // https://github.com/facebookincubator/create-react-app/pull/1180
  config.module
    .rule('svg')
    .test(/\.(svg)(\?.*)?$/)
    .use('file-loader')
    .loader(require.resolve('file-loader'))
    .options({
      name: genAssetSubPath('img')
    })

  config.module
    .rule('media')
    .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
    .use('url-loader')
    .loader(require.resolve('url-loader'))
    .options(genUrlLoaderOptions('media'))

  config.module
    .rule('fonts')
    .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
    .use('url-loader')
    .loader(require.resolve('url-loader'))
    .options(genUrlLoaderOptions('fonts'))
}
