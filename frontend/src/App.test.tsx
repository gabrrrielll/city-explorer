import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the app title', () => {
    const { getByText } = render(<App />);
    expect(getByText('City Explorer')).toBeInTheDocument();
  });

  it('renders the search input', () => {
    const { getByPlaceholderText } = render(<App />);
    expect(getByPlaceholderText('Search for a city...')).toBeInTheDocument();
  });

  it('renders the add new city button', () => {
    const { getByText } = render(<App />);
    expect(getByText('Add New City')).toBeInTheDocument();
  });
});
