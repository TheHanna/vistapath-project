import React, { FC, useContext, useEffect, useState } from 'react';
import { AppStateContext } from '../../contexts/AppStateContext';
import { CaseStatusAction, getNextActions, getNextStatus } from '../../models/CaseStatus';
import { CaseDetailHeader } from '../CaseDetailHeader/CaseDetailHeader';
import { CaseImageList } from '../CaseImageList/CaseImageList';
import styles from './CaseDetail.module.scss';

export const CaseDetail: FC = () => {
  const { selectedCase, updateSelectedCase } = useContext(AppStateContext);
  const [nextActions, setNextActions] = useState([] as CaseStatusAction[])

  useEffect(() => {
    if (selectedCase) {
      const nextActionsForCase = getNextActions(selectedCase.status);
      setNextActions(nextActionsForCase)
    }
  }, [selectedCase]);

  if (selectedCase != null) {
    const handleStatusChange = (action: CaseStatusAction): void => {
      const update = { status: getNextStatus(action) }
      updateSelectedCase(update);
    }
  
    return (
      <section className={styles.CaseDetail}>
        <CaseDetailHeader />
        <CaseImageList />
        <footer className={styles.CaseDetail__footer}>
          {nextActions?.map((action: CaseStatusAction) =>
            <button id={action}
                    name={action}
                    value={action}
                    key={action}
                    onClick={() => handleStatusChange(action)}>
              {action}
            </button>
          )}
        </footer>
      </section>
    );
  } else {
    return <></>
  }
  
};
