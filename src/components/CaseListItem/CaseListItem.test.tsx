import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CaseListItem from './CaseListItem';
import { CaseAnalysis } from '../../models/CaseAnalysis';

const caseAnalysis = CaseAnalysis.generateCases(1).pop() as CaseAnalysis;

describe('<CaseListItem />', () => {
  test('it should mount', () => {
    // render(<CaseListItem caseAnalysis={caseAnalysis} />);
    
    // const caseListItem = screen.getByTestId('CaseListItem');

    // expect(caseListItem).toBeInTheDocument();
  });
});