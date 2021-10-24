import { postRequest } from '@/utils/api';

//新增接口
export function baseSaveEntity(namespace: string, model: string, params: any) {
  return postRequest(`/api/${namespace}/${model}/save`, params);
}

//分页查询接口
export function basePageList(
  namespace: string,
  model: string,
  page: any,
  query: any,
) {
  return postRequest(`/api/${namespace}/${model}/page-list`, {
    page: page,
    query: query,
  });
}
//列表查询接口
export function baseList(namespace: string, model: string, query: any) {
  return postRequest(`/api/${namespace}/${model}/list`, query);
}
//详情查询接口
export function baseQueryEntity(namespace: string, model: string, id: number) {
  return postRequest(`/api/${namespace}/${model}/query`, { id: id });
}
//删除接口
export function baseDeleteEntity(namespace: string, model: string, id: number) {
  return postRequest(`/api/${namespace}/${model}/delete`, { id: id });
}
