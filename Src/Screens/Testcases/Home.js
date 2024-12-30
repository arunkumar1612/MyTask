import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Home from '../Home'; // Adjust the path to the Home component
import { setPage, setLoading, SearchUser } from '../redux/features/LoginSlice';

jest.mock('../redux/features/LoginSlice', () => ({
  setPage: jest.fn(),
  setLoading: jest.fn(),
  SearchUser: jest.fn(() => jest.fn(() => Promise.resolve())),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Home Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      login: {
        page: 1,
        data: [
          { login: 'User1', avatar_url: 'https://via.placeholder.com/35', type: 'User' },
          { login: 'User2', avatar_url: 'https://via.placeholder.com/35', type: 'Admin' },
        ],
        isLoading: false,
      },
    });
  });

  it('renders the component correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(getByText('Image')).toBeTruthy();
    expect(getByText('Name')).toBeTruthy();
    expect(getByText('Type')).toBeTruthy();
    expect(getByText('User1')).toBeTruthy();
    expect(getByText('Admin')).toBeTruthy();
  });

  it('displays an activity indicator when loading', () => {
    store = mockStore({
      login: {
        page: 1,
        data: [],
        isLoading: true,
      },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('loads more data on reaching the end', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const flatList = getByTestId('flat-list');

    fireEvent.scroll(flatList, {
      nativeEvent: {
        contentOffset: { y: 1000 },
        contentSize: { height: 1000 },
        layoutMeasurement: { height: 500 },
      },
    });

    await waitFor(() => {
      expect(setLoading).toHaveBeenCalledWith(true);
      expect(setPage).toHaveBeenCalled();
      expect(SearchUser).toHaveBeenCalled();
    });
  });

  it('renders the user data correctly', () => {
    const { getByText, getAllByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(getByText('User1')).toBeTruthy();
    expect(getByText('User2')).toBeTruthy();
    expect(getAllByText('User').length).toBe(1);
    expect(getAllByText('Admin').length).toBe(1);
  });
});
