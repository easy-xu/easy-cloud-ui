import { postRequest } from '@/utils/api';

//树接口
export function knowledgeNodeTree(params?: any) {
  return postRequest('/knowledge/node/tree', params);
}
//词云接口
export function knowledgeNodeWordCloud(params?: any) {
  return postRequest('/knowledge/node/word-cloud', params);
}

export function knowledgeNodeSave(params?: any) {
  return postRequest('/knowledge/node/save', params);
}
