import { getRequest, postRequest } from '@/utils/api';

//首次访问
export function initDevice() {
  return getRequest('/cms/user/device');
}

//登录接口
export function loginApi(params: any) {
  return postRequest('/cms/user/login', params);
}
//退出接口
export function logoutApi() {
  return postRequest('/cms/user/logout', {});
}
//注册接口
export function signinRequest(params: any) {
  return postRequest('/cms/user/signIn', params);
}

//查询当前用户指定菜单操作权限
export function cmsQueryOptionAuth(code: string) {
  return postRequest(`/cms/user/menu-option`, { code: code });
}
//重置密码
export function cmsResetPassword(params: any) {
  return postRequest(`/cms/user/reset-password`, params);
}
