import { createContext } from "react";
import { CaseAnalysis, CaseUpdate } from "../models/CaseAnalysis";

export interface AppState {
  cases: CaseAnalysis[];
  selectedCase?: CaseAnalysis;
  openCase: () => void;
  addCase: (newCase: CaseAnalysis) => void;
  removeCase: (deletedCase: CaseAnalysis) => void;
  selectCase: (newCase?: CaseAnalysis) => void;
  updateSelectedCase: (caseUpdate?: CaseUpdate) => void;
}

export const AppStateContext = createContext({} as AppState);
