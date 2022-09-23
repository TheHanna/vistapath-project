import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NewCaseForm from './NewCaseForm';

describe('<NewCaseForm />', () => {
  test('it should mount', () => {
    render(<NewCaseForm />);
    
    const newCaseForm = screen.getByTestId('NewCaseForm');

    expect(newCaseForm).toBeInTheDocument();
  });
});