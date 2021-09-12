import { postReqeust, getRequset } from '@/utils/api';

//查询问题接口
export function getQuestionnaire(id: number) {
  return getRequset('/api/questionnaire/get/' + id);
}
//初始化回答记录
export function initAnswer(id: number) {
  return getRequset('/api/answer/init/' + id);
}

//查询单个问题
export function getQuestion(questionId: number) {
  return getRequset('/api/question/get/' + questionId);
}

export function getQuestionByIndex(questionnaireId: number, index: number) {
  return getRequset('/api/question/index/' + questionnaireId + '/' + index);
}
