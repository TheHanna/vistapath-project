import React, { FC } from 'react';
import { CaseAnalysis } from '../../models/CaseAnalysis';
import CaseStatusIndicator from '../CaseStatusIndicator/CaseStatusIndicator';
import styles from './CaseListItem.module.scss';

interface CaseListItemProps {
  caseAnalysis: CaseAnalysis;
  onClick: (caseAnalysis: CaseAnalysis) => void;
}

const CaseListItem: FC<CaseListItemProps> = props => {
  const { caseAnalysis } = props;

  return (
    <div className={styles.CaseListItem} onClick={() => props.onClick(caseAnalysis)}>
      <header className={styles.CaseListItem__header}>
        <h1 className={styles['CaseListItem__case-name']}>{caseAnalysis.name}</h1>
        <CaseStatusIndicator status={caseAnalysis.status}></CaseStatusIndicator>
      </header>
      <small>Last update:
        <span className={styles['CaseListItem__case-last-updated']}>
          {caseAnalysis.updated}
        </span>
      </small>
    </div>    
  );
};

export default CaseListItem;
