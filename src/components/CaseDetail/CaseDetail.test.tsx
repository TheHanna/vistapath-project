import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CaseDetail } from './CaseDetail';

describe('<CaseDetail />', () => {
  test('it should mount', () => {
    render(<CaseDetail />);
    
    const caseDetail = screen.getByTestId('CaseDetail');

    expect(caseDetail).toBeInTheDocument();
  });
});