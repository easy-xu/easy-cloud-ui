import { getHeader } from '@/utils/header';

//登录接口
export function loginRequest(params: any) {
  return postReqeust('/api/user/login', params);
}
//注册接口
export function signinRequest(params: any) {
  return postReqeust('/api/user/signIn', params);
}

function postReqeust(url: string, params: any) {
  return {
    url: url,
    method: 'POST',
    data: params,
    headers: getHeader(),
  };
}
