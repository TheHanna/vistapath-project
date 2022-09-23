import classNames from 'classnames';
import React, { FC, useContext, useEffect, useState } from 'react';
import { AppStateContext } from '../../../contexts/AppStateContext';
import { CaseAnalysis } from '../../../models/CaseAnalysis';
import { CaseStatusIndicator } from '../../CaseStatusIndicator/CaseStatusIndicator';
import styles from './CaseListItem.module.scss';

interface CaseListItemProps {
  caseAnalysis: CaseAnalysis;
  onClick: (caseAnalysis: CaseAnalysis) => void;
}

export const CaseListItem: FC<CaseListItemProps> = props => {
  const { selectedCase } = useContext(AppStateContext);
  const { caseAnalysis, onClick } = props;
  const [caseItemStyle, setCaseItemStyle] = useState(styles.CaseListItem);

  useEffect(() => {
    const isSelected = selectedCase && selectedCase.uuid === caseAnalysis.uuid;
    setCaseItemStyle(isSelected
      ? classNames(styles.CaseListItem, styles.CaseListItem__selected_case)
      : styles.CaseListItem
    );
  }, [selectedCase, caseAnalysis]);

  return (
    <div className={caseItemStyle} onClick={() => onClick(caseAnalysis)}>
      <header className={styles.CaseListItem__header}>
        <h1 className={styles['CaseListItem__case-name']}>{caseAnalysis.name}</h1>
        <CaseStatusIndicator status={caseAnalysis.status}></CaseStatusIndicator>
      </header>
      <small>Last update:&nbsp;
        <span className={styles['CaseListItem__case-last-updated']}>
          {caseAnalysis.updated}
        </span>
      </small>
    </div>    
  );
};
