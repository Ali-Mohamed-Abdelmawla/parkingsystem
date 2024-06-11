import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardPage from './DashboardPage';

// Mock axios and sessionStorage for API and session data
jest.mock('../../axios.js', () => ({
  get: jest.fn().mockResolvedValue({ data: { AvailableSpaces: 5 } }),
}));
const mockSessionStorage = {
  getItem: jest.fn().mockReturnValue('10'), // Mocking occupied spaces in session storage
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.sessionStorage = mockSessionStorage;

describe('DashboardPage', () => {
  it('renders the component correctly in light mode', async () => {
    render(<DashboardPage darkMode={false} />);
    
    expect(screen.getByText('Real-time Parking Data')).toBeInTheDocument();
    expect(screen.getByText('Total Spaces')).toBeInTheDocument();
    expect(screen.getByText('Occupied Spaces')).toBeInTheDocument();
    expect(screen.getByText('Available Spaces')).toBeInTheDocument();
    expect(screen.getByText('CameraSwitcher')).toBeInTheDocument();
  });

  it('fetches and displays available spaces correctly', async () => {
    render(<DashboardPage darkMode={false} />);

    // Waits for the API call to resolve
    await screen.findByText('5');
    
    // Asserts that the correct values are displayed
    expect(screen.getByText('15')).toBeInTheDocument(); // Total Spaces
    expect(screen.getByText('10')).toBeInTheDocument(); // Occupied Spaces
    expect(screen.getByText('5')).toBeInTheDocument();  // Available Spaces
  });

  it('handles API errors gracefully', async () => {
    // Mocking a 401 Unauthorized response from the API
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console errors
    require('../../axios.js').get.mockRejectedValueOnce({ response: { status: 401 } });

    render(<DashboardPage darkMode={false} />);

    // Waits for the API error handling to complete
    await screen.findByText('0');
    
    // Asserts that the correct values are displayed after handling the error
    expect(screen.getByText('10')).toBeInTheDocument(); // Occupied Spaces
    expect(screen.getByText('0')).toBeInTheDocument();  // Available Spaces
  });
});
