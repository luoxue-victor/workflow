module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        '> 1%',
        'last 3 versions',
        'iOS >= 8',
        'Android >= 4',
        'Chrome >= 40'
      ]
    },
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 750,
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [],
      landscape: false,
      landscapeUnit: 'vw',
      landscapeWidth: 568
    }
  }
}
