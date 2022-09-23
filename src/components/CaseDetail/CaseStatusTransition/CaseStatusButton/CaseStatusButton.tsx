import classNames from 'classnames';
import React, { FC, MouseEvent } from 'react';
import { actionIconMap, CaseStatusAction } from '../../../../models/CaseStatus';
import styles from './CaseStatusButton.module.scss';

interface CaseStatusButtonProps {
  action: CaseStatusAction;
  handler: (event: MouseEvent<HTMLButtonElement>) => void
}

export const CaseStatusButton: FC<CaseStatusButtonProps> = (props) => {
  const { action, handler } = props;
  const buttonClassName = classNames(
    styles.CaseStatusButton__button,
    styles[`CaseStatusButton__${action}`]
  );
  const IconElement: JSX.Element = actionIconMap[action];
  return (
    <div className={styles.CaseStatusButton}>
      <button className={buttonClassName} onClick={handler}>
        <>
          <span className={styles.CaseStatusButton__button_text}>
            {action}
          </span>
          {IconElement}
        </>
      </button>
    </div>
  )
};
