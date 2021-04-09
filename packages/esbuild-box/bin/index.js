const esbuild = require('esbuild')

module.exports = () => {
  return esbuild({
    include: /\.[jt]sx?$/,
    exclude: /node_modules/,
    sourceMap: false,
    minify: process.env.NODE_ENV === 'production',
    target: 'esnext',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    // Like @rollup/plugin-replace
    define: {
      __VERSION__: '"1.0.0"'
    },
    tsconfig: 'tsconfig.json',
    // Add extra loaders
    loaders: {
      // Add .json files support
      // require @rollup/plugin-commonjs
      '.json': 'json',
      // Enable JSX in .js files too
      '.js': 'jsx',
      '.ts': 'tsx',
    }
  })
}
