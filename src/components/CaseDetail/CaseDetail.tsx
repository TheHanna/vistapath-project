import React, { FC, useContext } from "react";
import { AppStateContext } from "../../contexts/AppStateContext";
import { CaseDetailHeader } from "./CaseDetailHeader/CaseDetailHeader";
import { CaseDetailNotes } from "./CaseDetailNotes/CaseDetailNotes";
import { CaseImageList } from "./CaseImageList/CaseImageList";
import { CaseStatusTransition } from "./CaseStatusTransition/CaseStatusTransition";
import { RemoveCaseButton } from "./CaseStatusTransition/RemoveCaseButton/RemoveCaseButton";
import styles from "./CaseDetail.module.scss";

export const CaseDetail: FC = () => {
  const { selectedCase, updateSelectedCase } = useContext(AppStateContext);

  if (selectedCase) {
    return (
      <section className={styles.CaseDetail}>
        <CaseDetailHeader />
        <article className={styles.CaseDetail__body}>
          <CaseDetailNotes selectedCase={selectedCase} updateSelectedCase={updateSelectedCase} />
          <p>Images</p>
          <CaseImageList />
        </article>
        <footer className={styles.CaseDetail__footer}>
          <CaseStatusTransition
              selectedCase={selectedCase}
              updateSelectedCase={updateSelectedCase} />
          <RemoveCaseButton />
        </footer>
      </section>
    );
  } else {
    return (
      <section className={styles.CaseDetail__no_case_selected}>
        <CaseDetailHeader />
      </section>
    );
  }
};
