import { postRequest, getRequest } from '@/utils/api';

//查询问题接口
export function getQuestionnaire(questionnaireId: number) {
  return postRequest('/api/questionnaire/get', { id: questionnaireId });
}
//初始化回答记录
export function initAnswer(questionnaireId: number) {
  return postRequest('/api/answer/init', { questionnaireId: questionnaireId });
}

//查询单个问题
export function getQuestion(questionId: number) {
  return postRequest('/api/question/get', { id: questionId });
}

export function getQuestionByIndex(questionnaireId: number, index: number) {
  return postRequest('/api/question/index', {
    questionnaireId: questionnaireId,
    questionIndex: index,
  });
}

//查询答案
export function getAnswer(answerId: number) {
  return postRequest('/api/answer/get', { id: answerId });
}

//保存问题答案
export function saveAnswerQuestion(params: any) {
  return postRequest('/api/answer/question/save', params);
}

//查询问题答案
export function getAnswerQuestion(answerId: number, questionId: number) {
  return postRequest('/api/answer/question/get', {
    answerId: answerId,
    questionId: questionId,
  });
}
