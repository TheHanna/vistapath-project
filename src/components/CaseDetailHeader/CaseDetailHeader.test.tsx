import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CaseDetailHeader } from './CaseDetailHeader';

describe('<CaseDetailHeader />', () => {
  test('it should mount', () => {
    render(<CaseDetailHeader />);
    
    const caseDetailHeader = screen.getByTestId('CaseDetailHeader');

    expect(caseDetailHeader).toBeInTheDocument();
  });
});