import { useState, useCallback } from 'react';
import { useRequest } from 'umi';
import { getQuestionnaire, getQuestionByIndex } from '@/services/questionnaire';
import session from '@/utils/storage';

export default function questionnaireModel() {
  const [questionnaire, setQuestionnaire] = useState<any>();

  return {
    setQuestionnaire,
    questionnaire,
  };
}
