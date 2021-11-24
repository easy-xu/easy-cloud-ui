import { RequestConfig } from 'umi';

//umi userequest格式适配
export const request: RequestConfig = {
  prefix: '/api',
  timeout: 10000,
  errorConfig: {
    adaptor: (resData) => {
      return {
        ...resData,
        success: resData.code == 200,
        errorMessage: resData.message ? resData.message : '服务器错误',
      };
    },
  },
};
