import React, { FC } from 'react';
import NewCaseButton from './NewCaseButton/NewCaseButton';
import styles from './AppHeader.module.scss';
import logo from '../../logo.png';

interface AppHeaderProps {}

export const AppHeader: FC<AppHeaderProps> = () => (
  <div className={styles.AppHeader}>
    <img className={styles.AppHeader__logo} src={logo} alt="VistaPath logo" />
    <h1 className={styles.AppHeader__title}>
      SENTRY<span className={styles.AppHeader__title___highlight}>FLUX</span>
    </h1>
    <NewCaseButton />
  </div>
);
