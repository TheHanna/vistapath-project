import React, { FC } from 'react';
import NewCaseButton from '../NewCaseButton/NewCaseButton';
import styles from './AppHeader.module.scss';

interface AppHeaderProps {}

export const AppHeader: FC<AppHeaderProps> = () => (
  <div className={styles.AppHeader} data-testid="AppHeader">
    <h1 className={styles.AppHeader__title} data-testid="AppHeader__title">
      SENTRY<span className={styles['AppHeader__title--highlight']}>FLUX</span>
    </h1>
    <NewCaseButton />
  </div>
);
