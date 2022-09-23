import React, { FocusEvent, KeyboardEvent, useContext, useEffect, useState } from 'react';
import { AppStateContext } from '../../../contexts/AppStateContext';
import { CaseStatusIndicator } from '../../CaseStatusIndicator/CaseStatusIndicator';
import styles from './CaseDetailHeader.module.scss';
import { TiTimes } from 'react-icons/ti'
import { CaseAnalysis } from '../../../models/CaseAnalysis';
import { CaseStatus } from '../../../models/CaseStatus';

export const CaseDetailHeader: React.FC = () => {
  const { cases, selectedCase, selectCase, updateSelectedCase } = useContext(AppStateContext);
  const [isEditing, setIsEditing] = useState(true);
  const [isEditable, setEditable] = useState(true);

  useEffect(() => {
    if (selectedCase?.name === '') {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [selectedCase])

  useEffect(() => {
    if (selectedCase?.status === CaseStatus.APPROVED) {
      setEditable(false);
    }
  }, [selectedCase]);

  const handleCaseNameChangeEnterKey = (event: KeyboardEvent<HTMLInputElement>): void => {
    const { currentTarget, key } = event;
    if (key === 'Enter') {
      updateCaseName(currentTarget.value);
    }
  }

  const handleCaseNameChangeBlur = (event: FocusEvent<HTMLInputElement>): void => {
    const { currentTarget } = event;
    updateCaseName(currentTarget.value);
  }

  const updateCaseName = (name: string = CaseAnalysis.randomCaseName()): void => {
    updateSelectedCase({ name });
    setIsEditing(false);
  }
  
  if (selectedCase) {
    const { status, name } = selectedCase;
    
    const TitleComponent = isEditing ? (
      <input autoFocus={isEditing}
        type="text"
        defaultValue={name}
        id="selectedCaseName"
        onKeyDown={handleCaseNameChangeEnterKey}
        onBlur={handleCaseNameChangeBlur}
        className={styles.CaseDetailHeader__title_edit}
      />
    ) : (
      <h1 onClick={() => isEditable ? setIsEditing(true) : null}
        className={styles.CaseDetailHeader__title}>
          {name}
      </h1>
    )

    return (
      <header className={styles.CaseDetailHeader}>
        <CaseStatusIndicator status={status} />
        {TitleComponent}
        <div className={styles.CaseDetailHeader__close}
          onClick={() => selectCase()}>
          <TiTimes />
        </div>
      </header>
    );
  } else {
    return (
      <header className={styles.CaseDetailHeader__no_case_selected}>
        <div className={styles.CaseDetailHeader__info}>
          <h1 className={styles.CaseDetailHeader__title}>No case selected</h1>
        </div>
        <small>
          {cases.length > 0
            ? 'To select a case, use the menu to the left'
            : 'Use the Open New Case button to create a new Case Analysis'
          }
          
        </small>
        
      </header>
    );
  }
}
