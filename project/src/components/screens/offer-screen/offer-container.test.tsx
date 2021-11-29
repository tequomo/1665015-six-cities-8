import * as Redux from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
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
import OfferContainer from './offer-container';

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

describe('Component: OfferContainer', () => {

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
          <OfferContainer currentOffer={fakeOffer} />
        </Router>
      </Provider>);

    expect(getByTestId('offer-container')).toBeInTheDocument();
    expect(queryAllByText(fakeOffer.title)[0]).toBeInTheDocument();
  });

  it('should render review form when user is logged in', () => {
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
      getByLabelText,
      getByRole,
    } = render(
      <Provider store={store}>
        <Router history={history}>
          <OfferContainer currentOffer={fakeOffer} />
        </Router>
      </Provider>);

    expect(getByLabelText(/Your review/i)).toBeInTheDocument();
    expect(getByRole('textbox')).toBeInTheDocument();
  });

  it('should not render review form when user is not logged in', () => {
    const store = mockStore({
      USER_AUTH: {
        authStatus: AuthStatus.NoAuth,
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
      queryByLabelText,
      queryByRole,
    } = render(
      <Provider store={store}>
        <Router history={history}>
          <OfferContainer currentOffer={fakeOffer} />
        </Router>
      </Provider>);

    expect(queryByLabelText(/Your review/i)).not.toBeInTheDocument();
    expect(queryByRole('textbox')).not.toBeInTheDocument();

  });

  it('should dispatch an 3 action when loading: current offer, nearny offers and reviews', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

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
      FAVORITES_DATA: {
        toggleIsFavoriteLoadingStatus: LoadingStatus.Succeeded,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/login" exact>
              <h1>Sign in Page</h1>
            </Route>
            <Route>
              <OfferContainer currentOffer={fakeOffer} />
            </Route>
          </Switch>
        </Router>
      </Provider>);

    expect(dispatch).toBeCalledTimes(3);
  });

});
