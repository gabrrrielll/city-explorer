import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CityCard from './CityCard';

describe('CityCard', () => {
  it('renders the city name', () => {
    const city = {
      id: 1,
      name: 'City 1',
      state: 'State',
      country: 'Country 1',
      touristRating: 3,
      dateEstablished: '2000-01-01',
      estimatedPopulation: 3333,
      countryCode2: 'Code2',
      countryCode3: 'Code3',
      currency: 'USD',
      weather: null,
    };
    const { getByText } = render(<CityCard city={city} onEdit={() => {}} onDelete={() => {}} />);
    expect(getByText('City 1')).toBeInTheDocument();
  });
});
