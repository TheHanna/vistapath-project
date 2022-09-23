import React, { ChangeEvent, ChangeEventHandler, FC, useCallback, useContext, useEffect, useState } from 'react';
import { AppState, AppStateContext } from '../../contexts/AppStateContext';
import { CaseAnalysis } from '../../models/CaseAnalysis';
import { caseStatuses, isCaseStatus } from '../../models/CaseStatus';
import CaseListItem from '../CaseListItem/CaseListItem';
import styles from './CaseList.module.scss';

export const CaseList: FC = () => {
  const {
    cases,
    updateSelectedCase
  }: AppState = useContext(AppStateContext);

  const [filteredCases, setFilteredCases] = useState(cases);
  const [filterBy, setFilterBy] = useState('');

  const filterCases = useCallback((status: string): void => {
    setFilterBy(status);
    const newFilteredCases = isCaseStatus(status)
      ? cases.filter(c => c.status === status)
      : cases;
    setFilteredCases(newFilteredCases);
  }, [setFilterBy, setFilteredCases, cases]);

  useEffect(() => {
    filterCases(filterBy);
  }, [filterBy, filterCases]);

  const handleCaseSelection = (caseAnalysis: CaseAnalysis) => {
    updateSelectedCase(caseAnalysis);
  }


  const handleCaseFilter: ChangeEventHandler<HTMLSelectElement> = (event: ChangeEvent<HTMLSelectElement>) => {
    const { target } = event;
    const status: string = (target as HTMLSelectElement).value;
    filterCases(status);
  }

  return (
    <section className={styles.CaseList} data-testid="CaseList">
      <header className={styles.CaseList__header}>
        <h1>Cases</h1>
        <select name="filter" id="filter" onChange={handleCaseFilter}>
          <option value="" defaultValue={""}>All</option>
          {caseStatuses.map(s =>
            <option value={s} id={s} key={s}>{s}</option>)}
        </select>
      </header>
      <article className={styles.CaseList__body}>
        {filteredCases.length > 0
          ? filteredCases?.map((analysis: CaseAnalysis) => 
              <CaseListItem caseAnalysis={analysis}
                key={analysis.uuid}
                onClick={() => handleCaseSelection(analysis)}
              />)
          : <div className={styles.CaseList__empty}>
              <h2>No cases found!</h2>
              <small>You can <span className={styles.CaseList__new}>open a New Case</span></small>
            </div>
        }
      </article>
    </section>
  );
}
