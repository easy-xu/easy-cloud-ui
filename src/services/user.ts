import { getRequest, postRequest } from '@/utils/api';

//首次访问获取用户id
export function visitedRequest() {
  return getRequest('/api/open/hello');
}

//登录接口
export function loginRequest(params: any) {
  return postRequest('/api/user/login', params);
}
//注册接口
export function signinRequest(params: any) {
  return postRequest('/api/user/signIn', params);
}
