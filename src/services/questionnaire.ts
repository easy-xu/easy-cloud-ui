import { postRequest, getRequest } from '@/utils/api';

//查询问题接口
export function queryQuestionnaire(questionnaireId: number) {
  return postRequest('/api/questionnaire/query', { id: questionnaireId });
}
//初始化回答记录
export function initAnswer(questionnaireId: number) {
  return postRequest('/api/answer/init', { questionnaireId: questionnaireId });
}
//查询回答状态
export function statusAnswer(answerId: number) {
  return postRequest('/api/answer/status', { id: answerId });
}

//查询单个问题
export function queryQuestion(questionId: number) {
  return postRequest('/api/question/query', { id: questionId });
}

export function queryQuestionByIndex(questionnaireId: number, index: number) {
  return postRequest('/api/question/index', {
    questionnaireId: questionnaireId,
    questionIndex: index,
  });
}

//查询答案
export function queryAnswer(answerId?: number, questionnaireId?: number) {
  return postRequest('/api/answer/query', {
    id: answerId,
    questionnaireId: questionnaireId,
  });
}

//保存问题答案
export function saveAnswerQuestion(params: any) {
  return postRequest('/api/answer/question/save', params);
}

//查询问题答案
export function queryAnswerQuestion(answerId: number, questionId: number) {
  return postRequest('/api/answer/question/query', {
    answerId: answerId,
    questionId: questionId,
  });
}

export function listAnswerResult(answerId: number) {
  return postRequest('/api/result/list', { answerId: answerId });
}
