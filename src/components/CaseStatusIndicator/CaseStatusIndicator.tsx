import React, { FC } from 'react';
import { CaseStatus } from '../../models/CaseStatus';
import styles from './CaseStatusIndicator.module.scss';
import cn from 'classnames';

interface CaseStatusIndicatorProps {
  status: CaseStatus;
}

export const CaseStatusIndicator: FC<CaseStatusIndicatorProps> = (props: CaseStatusIndicatorProps) => {
  const { status } = props;
  const statusClassName: string = cn(
    styles.CaseStatusIndicator,
    styles[`CaseStatusIndicator__${status}`]
  )
  
  return (
    <div className={statusClassName}>
      {status}
    </div>
  )
};
