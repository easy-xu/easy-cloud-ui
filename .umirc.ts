import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // proxy: {
  //   '/api': {
  //     'target': 'http://localhost:8080/',
  //     'changeOrigin': true,
  //   },
  // },
  fastRefresh: {},
  webpack5: {},
});
