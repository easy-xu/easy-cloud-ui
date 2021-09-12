import { useState, useCallback } from 'react';
import { useRequest } from 'umi';
import { getQuestionnaire, getQuestionByIndex } from '@/services/questionnaire';
import session from '@/utils/storage';

export default function questionnaireModel() {
  const [questionnaire, setQuestionnaire] = useState<any>();
  const [answer, setAnswer] = useState<any>();

  const [index, setIndex] = useState<number>(0);

  //查询问卷
  const queryQuestionnaire = useCallback((questionnaireId) => {
    useRequest(() => getQuestionnaire(questionnaireId), {
      onSuccess: (data) => {
        setQuestionnaire(data);
        //设置问题index
        if (data.answer) {
          setIndex(data.answer.questionIndex);
        } else {
          setIndex(1);
        }
      },
    });
  }, []);

  //查询回答记录

  return {
    queryQuestionnaire,
    setIndex,
    questionnaire,
    answer,
    index,
  };
}
