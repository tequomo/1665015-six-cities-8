import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { AuthStatus, LoadingStatus } from '../../../const';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../../services/api';
import { State } from '../../../types/state';
import { getFakeOffer } from '../../../utils/mock';
import OfferScreen from './offer-screen';

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

describe('Component: OfferScreen', () => {

  it('should render correctly with current offer', () => {
    const store = mockStore({
      USER_AUTH: {
        authStatus: AuthStatus.Auth,
      },
      CURRENT_OFFER_DATA: {
        currentOffer: fakeOffer,
        currentOfferLoadingStatus: LoadingStatus.Succeeded,
      },
      NEARBY_DATA: {
        nearbyOffers: [fakeOffer],
        nearbyOffersLoadingStatus: LoadingStatus.Succeeded,
      },
      REVIEWS_DATA: {
        offerReviews: [],
        offerReviewsLoadingStatus: LoadingStatus.Succeeded,
        reviewLoadingStatus: LoadingStatus.Idle,
      },
    });

    const {
      queryAllByText,
      getByTestId,
    } = render(
      <Provider store={store}>
        <Router history={history}>
          <OfferScreen />
        </Router>
      </Provider>);

    expect(getByTestId('offer-container')).toBeInTheDocument();
    expect(queryAllByText(fakeOffer.title)[0]).toBeInTheDocument();
  });

  it('should render loader when data is loading', () => {
    const store = mockStore({
      USER_AUTH: {
        authStatus: AuthStatus.Auth,
      },
      CURRENT_OFFER_DATA: {
        currentOffer: null,
        currentOfferLoadingStatus: LoadingStatus.Loading,
      },
      NEARBY_DATA: {
        nearbyOffers: [],
        nearbyOffersLoadingStatus: LoadingStatus.Loading,
      },
      REVIEWS_DATA: {
        offerReviews: [],
        offerReviewsLoadingStatus: LoadingStatus.Loading,
        reviewLoadingStatus: LoadingStatus.Idle,
      },
    });

    const {
      queryByTestId,
    } = render(
      <Provider store={store}>
        <Router history={history}>
          <OfferScreen />
        </Router>
      </Provider>);

    expect(queryByTestId('loader')).toBeInTheDocument();
  });

  it('should render NotFound component when data is abcent', () => {
    const store = mockStore({
      USER_AUTH: {
        authStatus: AuthStatus.Auth,
      },
      CURRENT_OFFER_DATA: {
        currentOffer: null,
        currentOfferLoadingStatus: LoadingStatus.Failed,
      },
      NEARBY_DATA: {
        nearbyOffers: [],
        nearbyOffersLoadingStatus: LoadingStatus.Failed,
      },
      REVIEWS_DATA: {
        offerReviews: [],
        offerReviewsLoadingStatus: LoadingStatus.Failed,
        reviewLoadingStatus: LoadingStatus.Idle,
      },
    });

    const {
      getByText,
      getAllByText,
    } = render(
      <Provider store={store}>
        <Router history={history}>
          <OfferScreen />
        </Router>
      </Provider>);

    expect(getByText('404')).toBeInTheDocument();
    expect(getAllByText(/Page not found/i)[0]).toBeInTheDocument();
    expect(getByText('Back to main page')).toBeInTheDocument();
  });

});
