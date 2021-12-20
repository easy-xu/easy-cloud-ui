import { postRequest } from '@/utils/api';

//分页查询接口
export function basePageList(
  model: string,
  entity: string,
  page: any,
  query: any,
) {
  return postRequest(`/${model}/${entity}/page-list`, {
    page: page,
    query: query,
  });
}
//列表查询接口
export function baseList(model: string, entity: string, query: any) {
  return postRequest(`/${model}/${entity}/list`, query);
}
//新增接口
export function baseAddEntity(model: string, entity: string, params: any) {
  return postRequest(`/${model}/${entity}/add`, params);
}
export function baseEditEntity(model: string, entity: string, params: any) {
  return postRequest(`/${model}/${entity}/edit`, params);
}
//主键查询接口
export function baseGetEntity(model: string, entity: string, id: number) {
  return postRequest(`/${model}/${entity}/get`, { id: id });
}
//查询接口
export function baseQueryEntity(model: string, entity: string, id: number) {
  return postRequest(`/${model}/${entity}/query`, { id: id });
}
export function baseTree(model: string, entity: string, params: any) {
  return postRequest(`/${model}/${entity}/tree`, params);
}
//删除接口
export function baseDeleteEntity(model: string, entity: string, id: number) {
  return postRequest(`/${model}/${entity}/delete`, { id: id });
}
