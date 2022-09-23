import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NewCaseButton from './NewCaseButton';

describe('<NewCaseButton />', () => {
  test('it should mount', () => {
    render(<NewCaseButton />);
    
    const newCaseButton = screen.getByTestId('NewCaseButton');

    expect(newCaseButton).toBeInTheDocument();
  });
});