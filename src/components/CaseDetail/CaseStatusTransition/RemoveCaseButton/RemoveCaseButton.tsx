import React, { FC, useContext } from 'react';
import { AppStateContext } from '../../../../contexts/AppStateContext';
import styles from './RemoveCaseButton.module.scss'
import { TiTrash } from 'react-icons/ti';
import { CaseAnalysis } from '../../../../models/CaseAnalysis';

interface RemoveCaseButtonProps {}

export const RemoveCaseButton: FC<RemoveCaseButtonProps> = props => {
  const { selectedCase, removeCase } = useContext(AppStateContext);

  const handleCaseRemove = () => {
    const answer = window.confirm(`Are you sure you want to remove the case named "${selectedCase?.name}"? This action cannot be undone.`);
    if (answer) removeCase(selectedCase as CaseAnalysis); 
  }

  return (
    <div className={styles.RemoveCaseButton} onClick={handleCaseRemove}>
      <button className={styles.RemoveCaseButton__button}>
        <span className={styles.RemoveCaseButton__button_text}>Delete case</span>
        <TiTrash />
      </button>
    </div>
  )
}