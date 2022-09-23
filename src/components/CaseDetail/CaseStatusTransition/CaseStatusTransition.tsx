import React, { FC, useEffect, useState } from 'react';
import { CaseAnalysis, CaseUpdate } from '../../../models/CaseAnalysis';
import { CaseStatusAction, getNextActions, getNextStatus } from '../../../models/CaseStatus';
import { CaseStatusButton } from './CaseStatusButton/CaseStatusButton';
import styles from './CaseStatusTransition.module.scss'

interface CaseStatusTransitionProps {
  selectedCase: CaseAnalysis;
  updateSelectedCase: (caseUpdate: CaseUpdate) => void;
}

export const CaseStatusTransition: FC<CaseStatusTransitionProps> = props => {
  const { selectedCase, updateSelectedCase } = props;
  const [nextActions, setNextActions] = useState([] as CaseStatusAction[])

  useEffect(() => {
    if (selectedCase) {
      const nextActionsForCase = getNextActions(selectedCase.status);
      setNextActions(nextActionsForCase);
    }
  }, [selectedCase]);

  const updateCaseStatus = (action: CaseStatusAction): void =>
    updateSelectedCase({ status: getNextStatus(action) });

  return (
    <div className={styles.CaseStatusTransition}>
      {nextActions?.map((action: CaseStatusAction) =>
        <CaseStatusButton
          action={action}
          key={action}
          handler={() => updateCaseStatus(action)}
        />
      )}
    </div>
  )
}