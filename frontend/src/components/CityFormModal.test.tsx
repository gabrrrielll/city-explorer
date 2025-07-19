import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CityFormModal from './CityFormModal';

const onClose = jest.fn();
const onSave = jest.fn();

describe('CityFormModal', () => {
  it('renders the modal title', () => {
    const { getByText } = render(
      <CityFormModal
        city={null}
        open={true}
        onClose={onClose}
        onSave={(city) => {
          onSave;
        }}
      />
    );
    expect(getByText('Add New City')).toBeInTheDocument();
  });
});
``;
