import React, { FC, MouseEvent, useContext } from 'react';
import { AppStateContext } from '../../contexts/AppStateContext';
import { CaseAnalysis } from '../../models/CaseAnalysis';
import styles from './NewCaseButton.module.scss';

interface NewCaseButtonProps {}

const NewCaseButton: FC<NewCaseButtonProps> = () => {
  const { updateSelectedCase } = useContext(AppStateContext);
  
  const openNewCase = () => {
    const newCase: CaseAnalysis = new CaseAnalysis({ name: '' });
    updateSelectedCase(newCase);
  }
  
  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    openNewCase();
  }
  
  return (
    <button onClick={handleClick} className={styles.NewCaseButton} data-testid="NewCaseButton">
      Open New Case
    </button>
  );
};

export default NewCaseButton;
