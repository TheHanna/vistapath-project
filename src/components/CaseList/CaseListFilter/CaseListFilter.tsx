import React, { ChangeEventHandler, FC } from 'react';
import { caseStatuses } from '../../../models/CaseStatus';
import styles from './CaseListFilter.module.scss'

interface CaseListFilterProps {
  handleCaseFilter: ChangeEventHandler<HTMLSelectElement>;
}

export const CaseListFilter: FC<CaseListFilterProps> = props => {
  const { handleCaseFilter } = props;
  return (
    <div className={styles.CaseListFilter}>
      <select className={styles.CaseListFilter__select}
        name="filter"
        id="filter"
        onChange={handleCaseFilter}
      >
        <option value="" defaultValue={""}>All</option>
        {caseStatuses.map(s => (
          <option value={s} id={s} key={s}>{s}</option>
        ))}
      </select>
    </div>
  )
}