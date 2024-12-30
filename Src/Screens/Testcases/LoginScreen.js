import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../LoginScreen'; // Adjust the path based on your file structure

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('LoginScreen', () => {
  it('renders the login screen correctly', () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);
    expect(getByText('Login')).toBeTruthy();
    expect(getByPlaceholderText('Enter your username')).toBeTruthy();
    expect(getByText('Submit')).toBeTruthy();
  });

  it('shows an error when entering invalid characters', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    const input = getByPlaceholderText('Enter your username');
    fireEvent.changeText(input, '123');
    expect(getByText('Only letters are allowed.')).toBeTruthy();
  });

  it('does not show an error for valid input', () => {
    const { getByPlaceholderText, queryByText } = render(<LoginScreen />);
    const input = getByPlaceholderText('Enter your username');
    fireEvent.changeText(input, 'John Doe');
    expect(queryByText('Only letters are allowed.')).toBeNull();
  });

  it('shows an alert when submitting with empty input', () => {
    const alertMock = jest.spyOn(global, 'alert').mockImplementation(() => {});
    const { getByText } = render(<LoginScreen />);
    const submitButton = getByText('Submit');
    fireEvent.press(submitButton);
    expect(alertMock).toHaveBeenCalledWith('Error', 'Username cannot be empty.');
    alertMock.mockRestore();
  });

  it('triggers API call and navigates to DetailsScreen with data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ name: 'John Doe', email: 'john.doe@example.com', username: 'johndoe' }),
      })
    );

    const navigateMock = jest.fn();
    jest.mock('@react-navigation/native', () => ({
      useNavigation: () => ({ navigate: navigateMock }),
    }));

    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    const input = getByPlaceholderText('Enter your username');
    const submitButton = getByText('Submit');

    fireEvent.changeText(input, 'John');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/1');
      expect(navigateMock).toHaveBeenCalledWith('DetailsScreen', {
        userDetails: { name: 'John Doe', email: 'john.doe@example.com', username: 'johndoe' },
      });
    });

    global.fetch.mockRestore();
  });
});
