import * as Redux from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { Action } from 'redux';
import { AuthStatus, CITIES, LoadingStatus, SortingTypes } from '../../../const';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../../services/api';
import { State } from '../../../types/state';
import MainScreen from './main-screen';
import { getFakeOffer } from '../../../utils/mock';

const onFakeUnathorized = jest.fn();
const api = createAPI(onFakeUnathorized());
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeOffer = getFakeOffer();

describe('Component: MainScreen', () => {

  it('should render correctly with offers', () => {
    const store = mockStore({
      USER_AUTH: {
        authStatus: AuthStatus.Auth,
      },
      OFFERS_DATA: {
        offers: [fakeOffer],
        offersLoadingStatus: LoadingStatus.Succeeded,
      },
      STATE: {
        selectedCity: fakeOffer.city.name,
        currentSortingType: SortingTypes.DEFAULT,
      },
    });

    const {
      getByText,
    } = render(
      <Provider store={store}>
        <Router history={history}>
          <MainScreen />
        </Router>
      </Provider>);

    expect(getByText(/Cities/i)).toBeInTheDocument();
    expect(getByText(fakeOffer.title)).toBeInTheDocument();
  });

  it('should render loader when data is loading', () => {
    const store = mockStore({
      USER_AUTH: {
        authStatus: AuthStatus.Auth,
      },
      OFFERS_DATA: {
        offers: [],
        offersLoadingStatus: LoadingStatus.Loading,
      },
      STATE: {
        selectedCity: fakeOffer.city.name,
        currentSortingType: SortingTypes.DEFAULT,
      },
    });

    const {
      queryByTestId,
    } = render(
      <Provider store={store}>
        <Router history={history}>
          <MainScreen />
        </Router>
      </Provider>);

    expect(queryByTestId('loader')).toBeInTheDocument();
  });

  it('should dispach an action when fetch offers', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const store = mockStore({
      USER_AUTH: {
        authStatus: AuthStatus.Auth,
      },
      OFFERS_DATA: {
        offers: [],
        offersLoadingStatus: LoadingStatus.Idle,
      },
      STATE: {
        selectedCity: fakeOffer.city.name,
        currentSortingType: SortingTypes.DEFAULT,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <MainScreen />
        </Router>
      </Provider>);

    expect(dispatch).toBeCalledTimes(1);
  });

  it('should dispach an action by clicking on city', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const store = mockStore({
      USER_AUTH: {
        authStatus: AuthStatus.Auth,
      },
      OFFERS_DATA: {
        offers: [fakeOffer],
        offersLoadingStatus: LoadingStatus.Succeeded,
      },
      STATE: {
        selectedCity: fakeOffer.city.name,
        currentSortingType: SortingTypes.DEFAULT,
      },
    });

    const {
      getByText,
    } = render(
      <Provider store={store}>
        <Router history={history}>
          <MainScreen />
        </Router>
      </Provider>);

    userEvent.click(getByText(CITIES[2]));
    expect(dispatch).toBeCalledTimes(2);
  });

});
