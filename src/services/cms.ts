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

//新增接口
export function cmsSaveEntity(model: string, params: any) {
  return postRequest(`/api/cms/${model}/save`, params);
}

//分页查询接口
export function cmsPageList(model: string, page: any, query: any) {
  return postRequest(`/api/cms/${model}/page-list`, {
    page: page,
    query: query,
  });
}
//详情查询接口
export function cmsQueryEntity(model: string, id: number) {
  return postRequest(`/api/cms/${model}/query`, { id: id });
}
//删除接口
export function cmsDeleteEntity(model: string, id: number) {
  return postRequest(`/api/cms/${model}/delete`, { id: id });
}
