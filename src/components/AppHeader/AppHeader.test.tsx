import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AppHeader } from './AppHeader';

describe('<AppHeader />', () => {
  beforeEach(() => { render(<AppHeader/>); })
  
  test('it should mount', () => {
    const appHeader = screen.getByTestId('AppHeader');
    expect(appHeader).toBeInTheDocument();
  });

  test('it should display the app name', () => {
    const title = screen.getByTestId('AppHeader__title');
    expect(title).toHaveTextContent('SENTRYFLUX');
  });
});