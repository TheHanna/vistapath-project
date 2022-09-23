import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CaseStatusIndicator from './CaseStatusIndicator';
import { CaseStatus } from '../../models/CaseStatus';

describe('<CaseStatusIndicator />', () => {
  test('it should mount', () => {
    render(<CaseStatusIndicator status={CaseStatus.OPENED} />);
    
    const caseStatusIndicator = screen.getByTestId('CaseStatusIndicator');

    expect(caseStatusIndicator).toBeInTheDocument();
  });
});