import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AddVehiclePopupContainer from './AddVehiclePopupContainer';

jest.mock('sweetalert2'); // Mocks Sweetalert2 for testing purposes

describe('AddVehiclePopupContainer', () => {
  it('renders the component with initial inputs', () => {
    render(<AddVehiclePopupContainer onClose={() => jest.fn()} darkMode={false} />);
  
    // Check for 6 input fields with value matching underscore
    const inputFields = screen.getAllByRole('textbox');
    inputFields.forEach(input => {
      expect(input.value).toMatch(/_/);
    });
  });
  

  it('allows entering valid license plate number (Arabic letters and numbers)', async () => {
    const mockOnClose = jest.fn();
    render(<AddVehiclePopupContainer onClose={mockOnClose} darkMode={false} />);

    const inputFields = screen.getAllByRole('textbox');

    fireEvent.change(inputFields[0], { target: { value: 'ي' } }); // Arabic letter
    fireEvent.change(inputFields[1], { target: { value: 'م' } }); // Arabic letter
    fireEvent.change(inputFields[2], { target: { value: 'ن' } }); // Arabic letter
    fireEvent.change(inputFields[3], { target: { value: '1' } });
    fireEvent.change(inputFields[4], { target: { value: '2' } });
    fireEvent.change(inputFields[5], { target: { value: '3' } });

    await fireEvent.click(screen.getByText('Start Parking'));

    expect(mockOnClose).toHaveBeenCalledTimes(1); // Expects onClose to be called after successful submission
  });

  it('shows error for invalid characters in plate letters (English letters)', async () => {
    render(<AddVehiclePopupContainer onClose={() => jest.fn()} darkMode={false} />);
    

    const inputFields = screen.getAllByRole('textbox');

    fireEvent.change(inputFields[0], { target: { value: 'A' } }); // English letter (invalid)
    fireEvent.change(inputFields[1], { target: { value: 'B' } }); // English letter (invalid)
    fireEvent.change(inputFields[2], { target: { value: 'C' } }); // English letter (invalid)
    fireEvent.change(inputFields[3], { target: { value: '1' } });
    fireEvent.change(inputFields[4], { target: { value: '2' } });
    fireEvent.change(inputFields[5], { target: { value: '3' } });

    // Error message might be specific based on implementation, adjust accordingly
    expect(screen.getByText('License plate number must contain only Arabic letters for the first 3 characters.')).toBeInTheDocument();
  });

  it('shows error for invalid characters in plate numbers (letters)', async () => {
    render(<AddVehiclePopupContainer onClose={() => jest.fn()} darkMode={false} />);

    const inputFields = screen.getAllByRole('textbox');

    fireEvent.change(inputFields[0], { target: { value: 'ي' } }); // Arabic letter
    fireEvent.change(inputFields[1], { target: { value: 'م' } }); // Arabic letter
    fireEvent.change(inputFields[2], { target: { value: 'ن' } }); // Arabic letter
    fireEvent.change(inputFields[3], { target: { value: 'D' } }); // Invalid character (letter)
    fireEvent.change(inputFields[4], { target: { value: '2' } });
    fireEvent.change(inputFields[5], { target: { value: '3' } });

    expect(screen.getByText('License plate number must be 6 or 7 characters long.')).toBeInTheDocument(); // Generic error might be shown here, depends on implementation
  });

  it('allows adding an extra input field', async () => {
    render(<AddVehiclePopupContainer onClose={() => jest.fn()} darkMode={false} />);
    const addInputFieldButton = screen.getByText('+');
    const initialInputFields = screen.getAllByRole('textbox');

    expect(initialInputFields).toHaveLength(6);

    await fireEvent.click(addInputFieldButton);

    const newInputFields = screen.getAllByRole('textbox');
    expect(newInputFields).toHaveLength(7);
  });

  it('closes the popup on clicking the close button', async () => {
    const mockOnClose = jest.fn();
    render(<AddVehiclePopupContainer onClose={mockOnClose} darkMode={false} />);

    const closeButton = screen.getByText('Close');

    await fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
