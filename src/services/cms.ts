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

//菜单树接口
export function cmsMenuTree(params: any) {
  return postRequest('/api/cms/menu/tree', params);
}

//查询当前用户指定菜单操作权限
export function cmsQueryOptionAuth(menuCode: string) {
  return postRequest(`/api/cms/auth/user-menu-option`, { menuCode: menuCode });
}
//重置密码
export function cmsResetPassword(params: any) {
  return postRequest(`/api/cms/user/reset-password`, params);
}
