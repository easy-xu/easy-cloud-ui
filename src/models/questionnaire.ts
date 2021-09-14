import { useState, useCallback } from 'react';

export default function questionnaireModel() {
  const [questionnaire, setQuestionnaire] = useState<any>();

  return {
    setQuestionnaire,
    questionnaire,
  };
}
