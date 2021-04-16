import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import legacyPlugin from '@vitejs/plugin-legacy';
import { resolve } from 'path';

const fs = require('fs');
const lessToJS = require('less-vars-to-js');
const themeVariables = lessToJS(fs.readFileSync(resolve(__dirname, './src/antd-custom.less'), 'utf8'));
const reactSvgPlugin = require('vite-plugin-react-svg');

// https://cn.vitejs.dev/config/
export default defineConfig({
  base: './',
  root: './',
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      '@': resolve(__dirname, 'src'),
    },
  },
  define: {
    'process.env.REACT_APP_IS_LOCAL': '\'true\'',
    'window.__CID__': JSON.stringify(process.env.cid || 'id'),
  },
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://stoku.test.shopee.co.id/',
        changeOrigin: true,
        cookieDomainRewrite: {
          'stoku.test.shopee.co.id': 'localhost',
        },
      },
    },
  },
  build: {
    target: 'es2015',
    minify: 'terser',
    manifest: false,
    sourcemap: false,
    outDir: 'build',
    rollupOptions: {},
  },
  esbuild: {},
  optimizeDeps: {},
  plugins: [
    // viteSingleFile({
    //   title: 'dynamic title', // doesn't work
    // }),
    reactSvgPlugin(),
    reactRefresh(),
    legacyPlugin({
      targets: [
        'Android > 39',
        'Chrome >= 60',
        'Safari >= 10.1',
        'iOS >= 10.3',
        'Firefox >= 54',
        'Edge >= 15',
      ],
    }),
    // vitePluginImp({
    //   libList: [
    //     {
    //       libName: 'antd',
    //       style: (name) => `antd/es/${name}/style`,
    //     },
    //   ],
    // }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true;@import '${resolve('./src/vars.less')}';`,
          ...themeVariables,
        },
        javascriptEnabled: true,
      },
    },
  },
});
