import * as Redux from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { AuthStatus, LoadingStatus } from '../../../const';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { getFakeOffer } from '../../../utils/mock';
import { createAPI } from '../../../services/api';
import { State } from '../../../types/state';
import FavoritesScreen from './favorites-screen';

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

describe('Component: FavoritesScreen', () => {
  it('should render correctly with successfully loaded favorite offers', () => {

    const store = mockStore({
      USER_AUTH: {
        authStatus: AuthStatus.Auth,
      },
      FAVORITES_DATA: {
        favoriteOffers: [fakeOffer],
        favoriteOffersLoadingStatus: LoadingStatus.Succeeded,
      },
    });

    const {
      getByTestId,
      getByText,
    } = render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritesScreen />
        </Router>
      </Provider>);

    expect(getByTestId('favorites-screen')).toBeInTheDocument();
    expect(getByText(fakeOffer.title)).toBeInTheDocument();
    expect(getByText(fakeOffer.city.name)).toBeInTheDocument();
  });
  it('should render loader when data is loading', () => {

    const store = mockStore({
      USER_AUTH: {
        authStatus: AuthStatus.Auth,
      },
      FAVORITES_DATA: {
        favoriteOffers: [],
        favoriteOffersLoadingStatus: LoadingStatus.Loading,
      },
    });

    const {
      queryByTestId,
    } = render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritesScreen />
        </Router>
      </Provider>);

    expect(queryByTestId('loader')).toBeInTheDocument();
  });

  it('should show no favorites message when no favorites saved', () => {

    const store = mockStore({
      USER_AUTH: {
        authStatus: AuthStatus.Auth,
      },
      FAVORITES_DATA: {
        favoriteOffers: [],
        favoriteOffersLoadingStatus: LoadingStatus.Succeeded,
      },
    });

    const {
      getByText,
    } = render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritesScreen />
        </Router>
      </Provider>);

    expect(getByText('Nothing yet saved.')).toBeInTheDocument();
  });

  it('should dispach an action when fetch favorites', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const store = mockStore({
      USER_AUTH: {
        authStatus: AuthStatus.Auth,
      },
      FAVORITES_DATA: {
        favoriteOffers: [],
        favoriteOffersLoadingStatus: LoadingStatus.Idle,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritesScreen />
        </Router>
      </Provider>);

    expect(dispatch).toBeCalledTimes(1);
  });
});
