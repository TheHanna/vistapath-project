import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CaseList } from './CaseList';

describe('<CaseList />', () => {
  test('it should mount', () => {
    render(<CaseList />);
    
    const caseList = screen.getByTestId('CaseList');

    expect(caseList).toBeInTheDocument();
  });
});