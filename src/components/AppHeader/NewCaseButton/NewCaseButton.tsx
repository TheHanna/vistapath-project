import React, { FC, useContext } from 'react';
import { AppStateContext } from '../../../contexts/AppStateContext';
import styles from './NewCaseButton.module.scss';

interface NewCaseButtonProps {}

const NewCaseButton: FC<NewCaseButtonProps> = () => {
  const { openCase } = useContext(AppStateContext);
  
  return (
    <button onClick={openCase} className={styles.NewCaseButton}>
      Open New Case
    </button>
  );
};

export default NewCaseButton;
