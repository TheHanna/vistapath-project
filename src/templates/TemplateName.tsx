import React, { FC } from 'react';
// @ts-expect-error
import styles from './TemplateName.module.scss';

interface TemplateNameProps {}

export const TemplateName: FC<TemplateNameProps> = props => {
  return (
    <div className={styles.TemplateName}>
      TemplateName Component
    </div>
  )
}