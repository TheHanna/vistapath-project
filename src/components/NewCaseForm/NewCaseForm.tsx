import React, { FC } from 'react';
import styles from './NewCaseForm.module.scss';

interface NewCaseFormProps {}

const NewCaseForm: FC<NewCaseFormProps> = () => (
  <div className={styles.NewCaseForm} data-testid="NewCaseForm">
    NewCaseForm Component
  </div>
);

export default NewCaseForm;
