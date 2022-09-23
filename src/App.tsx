import { AppHeader } from "./components/AppHeader/AppHeader";
import { CaseList } from "./components/CaseList/CaseList";
import styles from './App.module.scss';
import { CaseDetail } from "./components/CaseDetail/CaseDetail";
import { CaseAnalysis, CaseUpdate } from "./models/CaseAnalysis";
import { AppState, AppStateContext } from "./contexts/AppStateContext";
import { useState } from "react";

const SAVED_CASES_LS_KEY = 'savedCases';
const SELECTED_CASE_LS_KEY = 'selectedCase';

const casesFromLocalStorage = localStorage.getItem(SAVED_CASES_LS_KEY);
const selectedCaseFromLocalStorage = localStorage.getItem(SELECTED_CASE_LS_KEY);
const initialCases: CaseAnalysis[] = casesFromLocalStorage
  ? JSON.parse(casesFromLocalStorage)
  : [];
const initialSelectedCase: CaseAnalysis | undefined = selectedCaseFromLocalStorage
  ? JSON.parse(selectedCaseFromLocalStorage)
  : undefined;

function App() {
  const [cases, setCases] = useState<CaseAnalysis[]>(initialCases);
  const [selectedCase, setSelectedCase] = useState<CaseAnalysis | undefined>(initialSelectedCase);

  const selectCase = (newCase?: CaseAnalysis): void => {
    const stringifiedCase = newCase
      ? JSON.stringify(newCase)
      : '';
    setSelectedCase(newCase)
    localStorage.setItem(SELECTED_CASE_LS_KEY, stringifiedCase);
  }

  const openCase = () => {
    const newCase: CaseAnalysis = new CaseAnalysis();
    addCase(newCase);
    selectCase(newCase);
  }

  const addCase = (newCase: CaseAnalysis): void => {
    saveCases([...cases, newCase]);
  }

  const removeCase = (deletedCase: CaseAnalysis): void => {
    const newCases = [...cases];
    const index = newCases.findIndex(c => c.uuid === deletedCase.uuid);
    if (deletedCase.uuid === selectedCase?.uuid) {
      selectCase();
    }
    newCases.splice(index, 1)
    console.log(newCases);
    
    saveCases(newCases);
  }

  const updateSelectedCase = (caseUpdate: CaseUpdate = {}): void => {
    const updatedCase: CaseAnalysis = { ...selectedCase, ...(caseUpdate as CaseAnalysis) };
    updateCase(updatedCase);
    selectCase(updatedCase);
  }

  const updateCase = (newCase: CaseAnalysis): void => {
    const caseIndex = cases.findIndex(c => c.uuid === newCase.uuid);
    cases[caseIndex] = newCase;
    saveCases(cases);
  }

  const saveCases = (cases: CaseAnalysis[]): void => {
    console.dir(cases);
    
    const stringifiedCases = JSON.stringify(cases);
    setCases(cases);
    localStorage.setItem(SAVED_CASES_LS_KEY, stringifiedCases);
  }

  const initialState: AppState = {
    cases,
    selectedCase,
    addCase,
    openCase,
    removeCase,
    selectCase,
    updateSelectedCase,
  }

  return (
    <AppStateContext.Provider value={initialState}>
      <div className={styles.App}>
        <AppHeader />
        <CaseList />
        <CaseDetail />
      </div>
    </AppStateContext.Provider>
  );
}

export default App;
