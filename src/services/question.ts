import { postReqeust, getRequset } from '@/utils/post';

//查询问题接口
export function getQuestionnaire(id: number) {
  return getRequset('/api/questionnaire/get/' + id);
}

export function initQuestionnaire(id: number) {
  return getRequset('/api/questionnaire/init/' + id);
}

//查询问题接口
export function questionRequest(id: number) {
  return getRequset('/api/question/get/' + id);
}
