const typeList = {
  0: 'own',
  1: 'ownRun',
  10: 'ownRun',
  11: 'ownRun',
  88: 'opponentRun',
  89: 'opponentRun',
  98: 'opponentRun',
  99: 'opponent'
};

export const fieldListDefault = () => {
  const fieldList = Array(100);

  for (let i = 0; i < fieldList.length; i++) {
    fieldList[i] = {
      type: typeList[i] || 'neutral'
    };
  }

  return fieldList;
};
