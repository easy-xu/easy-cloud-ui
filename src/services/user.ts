import { postReqeust } from '@/utils/post';

//登录接口
export function loginRequest(params: any) {
  return postReqeust('/api/user/login', params);
}
//注册接口
export function signinRequest(params: any) {
  return postReqeust('/api/user/signIn', params);
}
