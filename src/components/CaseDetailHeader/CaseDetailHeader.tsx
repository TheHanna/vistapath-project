import React, { useContext } from 'react';
import { AppStateContext } from '../../contexts/AppStateContext';
import CaseStatusIndicator from '../CaseStatusIndicator/CaseStatusIndicator';
import styles from './CaseDetailHeader.module.scss';

export const CaseDetailHeader: React.FC = () => {
  const { selectedCase } = useContext(AppStateContext);

  if (selectedCase) {
    const { status, uuid, name } = selectedCase;
    return (
      <header className={styles.CaseDetailHeader}>
        <div className={styles.CaseDetailHeader__info}>
          <h1 className={styles.CaseDetailHeader__title}>{name}</h1>
          <CaseStatusIndicator status={status} />
        </div>
        <small className={styles['CaseDetail__case-id']}>Case ID: {uuid}</small>
      </header>
    );
  } else {
    return <></>;
  }
}
