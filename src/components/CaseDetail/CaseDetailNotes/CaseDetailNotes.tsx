import debounce from 'lodash.debounce';
import React, { ChangeEvent, FC, useEffect, useMemo } from 'react';
import { CaseAnalysis, CaseUpdate } from '../../../models/CaseAnalysis';
import styles from './CaseDetailNotes.module.scss'

interface CaseDetailNotesProps {
  selectedCase: CaseAnalysis;
  updateSelectedCase: (caseUpdate: CaseUpdate) => void
}

export const CaseDetailNotes: FC<CaseDetailNotesProps> = props => {
  const { selectedCase, updateSelectedCase } = props;
  
  const debouncedChangeHandler = useMemo(
    () =>
      debounce(
        (event: ChangeEvent<HTMLTextAreaElement>): void =>
          updateSelectedCase({ notes: event.target.value }),
        500
      ),
    [updateSelectedCase]
  );

  useEffect(() => () => {
    debouncedChangeHandler.cancel();
  });
  
  return (
    <div className={styles.CaseDetailNotes}>
      <label htmlFor="notes">Notes</label>
      <textarea className={styles.CaseDetailNotes__notes}
        placeholder="General case notes"
        onChange={debouncedChangeHandler}
        name="notes"
        defaultValue={selectedCase.notes}
        rows={10}
        key={selectedCase.uuid}
        id="notes"
      />
    </div>
  )
}