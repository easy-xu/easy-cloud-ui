import { defineConfig } from 'umi';

export default defineConfig({
  favicon: '/assets/favicon.ico',
  nodeModulesTransform: {
    type: 'none',
  },
  // proxy: {
  //   '/api': {
  //     target: 'http://localhost:8080/',
  //     changeOrigin: true,
  //   },
  // },
  fastRefresh: {},
  dva: {},
  webpack5: {},
  mfsu: {},
});
