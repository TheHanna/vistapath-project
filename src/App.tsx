import { AppHeader } from "./components/AppHeader/AppHeader";
import { CaseList } from "./components/CaseList/CaseList";
import styles from './App.module.scss';
import { CaseDetail } from "./components/CaseDetail/CaseDetail";
import { CaseAnalysis, CaseUpdate } from "./models/CaseAnalysis";
import { AppState, AppStateContext } from "./contexts/AppStateContext";
import { useState } from "react";
import NewCaseButton from "./components/NewCaseButton/NewCaseButton";

const mockCases = CaseAnalysis.generateCases(20);
const [ firstMockCase ] = mockCases;

function App() {
  const [cases, setCases] = useState<CaseAnalysis[]>(mockCases);
  const [selectedCase, setSelectedCase] = useState<CaseAnalysis>(firstMockCase);
  // const [cases, setCases] = useState<CaseAnalysis[]>([]);
  // const [selectedCase, setSelectedCase] = useState<CaseAnalysis | undefined>();

  const selectCase = (newCase: CaseAnalysis): void => {
    setSelectedCase(newCase);
  }

  const updateSelectedCase = (caseUpdate: CaseUpdate = {}): void => {
    const updatedCase: CaseAnalysis = { ...selectedCase, ...(caseUpdate as CaseAnalysis) };
    setSelectedCase(updatedCase);
    updateCases(updatedCase);
  }

  const updateCases = (newCase: CaseAnalysis): void => {
    const caseIndex = cases.findIndex(c => c.uuid === newCase.uuid);
    cases[caseIndex] = newCase;
    setCases(cases);
  }

  const initialState: AppState = {
    cases,
    selectedCase,
    selectCase,
    updateSelectedCase,
  }

  return (
    <AppStateContext.Provider value={initialState}>
      <div className={styles.App}>
        <AppHeader />
        <CaseList />
        {selectedCase ? <CaseDetail /> : <NewCaseButton />}
      </div>
    </AppStateContext.Provider>
  );
}

export default App;
