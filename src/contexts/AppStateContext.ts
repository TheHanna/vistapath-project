import { createContext } from "react";
import { CaseAnalysis, CaseUpdate } from "../models/CaseAnalysis";

export interface AppState {
  cases: CaseAnalysis[];
  selectedCase?: CaseAnalysis;
  selectCase: (newCase: CaseAnalysis) => void;
  updateSelectedCase: (caseUpdate?: CaseUpdate) => void;
}

export const AppStateContext = createContext({} as AppState);
