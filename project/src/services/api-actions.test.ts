import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {
  checkAuthAction,
  fetchCurrentOfferAction,
  fetchFavoriteOffersAction,
  fetchNearbyOffersAction,
  fetchOfferReviewsAction,
  fetchOffersAction,
  loginAction,
  logoutAction,
  postOfferReviewAction,
  toggleIsFavoriteAction
} from './api-actions';
import {APIRoute, AppRoute, AuthStatus, HttpCode, LoadingStatus} from '../const';
import {State} from '../types/state';
import {
  loadCurrentOffer,
  loadFavoriteOffers,
  loadNearbyOffers,
  loadOfferReviews,
  loadOffers,
  receiveAuthData,
  redirectToRoute,
  requireAuthorization,
  requireLogout,
  setCurrentOfferLoadingStatus,
  setFavoriteOffersLoadingStatus,
  setNearbyOffersLoadingStatus,
  setOfferReviewsLoadingStatus,
  setOffersLoadingStatus,
  setReviewLoadingStatus,
  setToggleIsFavoriteLoadingStatus,
  updateOffer
} from '../store/action';
import {
  getFakeAuthDataResponse,
  getFakeAuthDataRequest,
  getFakeBackendOffers,
  getFakeBackendOffer,
  getFakeBackendReviews,
  getFakePostReview
} from '../utils/mock';
import {
  adaptAuthDataToClient,
  adaptMultipleToClient,
  adaptSingleToClient,
  adaptSomeReviewsToClient
} from './adapter';
import { AUTH_TOKEN_KEY_NAME } from './token';


enum FakeParamsData {
  OfferId = '2',
  Status = 1,
}

describe('Api actions', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const fakeAuthDataResponse = getFakeAuthDataResponse();
  const fakeAuthDataRequest = getFakeAuthDataRequest();
  const fakeBackendOffers = getFakeBackendOffers();
  const fakeBackendOffer = getFakeBackendOffer();
  const fakeBackendReviews = getFakeBackendReviews();
  const fakePostReview = getFakePostReview();

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  describe('User authorization actions', () => {

    it('should set authorization status to «AUTH» and receive auth data when server return 200', async () => {
      const store = mockStore();

      mockAPI
        .onGet(APIRoute.Login)
        .reply(HttpCode.Ok, fakeAuthDataResponse);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(checkAuthAction());

      expect(store.getActions()).toEqual([
        requireAuthorization(AuthStatus.Auth),
        receiveAuthData(adaptAuthDataToClient(fakeAuthDataResponse)),
      ]);
    });

    it('should set authorization status to «NO_AUTH» when server return 401', async () => {
      const store = mockStore();

      mockAPI
        .onGet(APIRoute.Login)
        .reply(HttpCode.Unauthorized, []);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(checkAuthAction());

      expect(store.getActions()).toEqual([
        requireAuthorization(AuthStatus.NoAuth),
      ]);
    });

    it('should dispatch requireAuthorization, receiveAuthData and redirectToRoute  when POST /login', async () => {
      const store = mockStore();

      mockAPI
        .onPost(APIRoute.Login)
        .reply(HttpCode.Ok, fakeAuthDataResponse);

      Storage.prototype.setItem = jest.fn();

      expect(store.getActions()).toEqual([]);

      await store.dispatch(loginAction(fakeAuthDataRequest));

      expect(store.getActions()).toEqual([
        requireAuthorization(AuthStatus.Auth),
        receiveAuthData(adaptAuthDataToClient(fakeAuthDataResponse)),
        redirectToRoute(AppRoute.Main),
      ]);

      expect(Storage.prototype.setItem).toBeCalledTimes(1);
      expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME, fakeAuthDataResponse.token);
    });

    it('should dispatch Logout when DELETE /logout', async () => {
      const store = mockStore();

      mockAPI
        .onDelete(APIRoute.Logout)
        .reply(HttpCode.NoContent);

      Storage.prototype.removeItem = jest.fn();

      await store.dispatch(logoutAction());

      expect(store.getActions()).toEqual([requireLogout()]);
      expect(Storage.prototype.removeItem).toBeCalledTimes(1);
      expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME);
    });

  });

  describe('Fetching offers actions', () => {

    it('should load offers and change offersLoadingStatus when GET /offers', async () => {
      const store = mockStore();

      mockAPI
        .onGet(APIRoute.Hotels)
        .reply(HttpCode.Ok, fakeBackendOffers);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchOffersAction());

      expect(store.getActions()).toEqual([
        loadOffers(adaptMultipleToClient(fakeBackendOffers)),
        setOffersLoadingStatus(LoadingStatus.Succeeded),
      ]);
    });

    it('should change offersLoadingStatus to failed when GET /offers', async () => {
      const store = mockStore();

      mockAPI
        .onGet(APIRoute.Hotels)
        .reply(HttpCode.NotFound, []);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchOffersAction());

      expect(store.getActions()).toEqual([
        setOffersLoadingStatus(LoadingStatus.Failed),
      ]);
    });

  });

  describe('Fetching current offer actions', () => {

    it('should load current offer and change currentOfferLoadingStatus when GET /hotels/id', async () => {
      const store = mockStore();

      mockAPI
        .onGet(`${APIRoute.Hotels}/${FakeParamsData.OfferId}`)
        .reply(HttpCode.Ok, fakeBackendOffer);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchCurrentOfferAction(FakeParamsData.OfferId));

      expect(store.getActions())
        .toEqual([
          loadCurrentOffer(adaptSingleToClient(fakeBackendOffer)),
          setCurrentOfferLoadingStatus(LoadingStatus.Succeeded),
        ]);
    });

    it('should change currentOfferLoadingStatus to failed when GET /hotels/id', async () => {
      const store = mockStore();

      mockAPI
        .onGet(`${APIRoute.Hotels}/${FakeParamsData.OfferId}`)
        .reply(HttpCode.NotFound, []);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchCurrentOfferAction(FakeParamsData.OfferId));

      expect(store.getActions())
        .toEqual([
          setCurrentOfferLoadingStatus(LoadingStatus.Failed),
        ]);
    });

  });

  describe('Fetching favorite offers actions', () => {

    it('should load favorite offers and change favoriteOffersLoadingStatus when GET / favoriteOffers', async () => {
      const store = mockStore();

      mockAPI
        .onGet(APIRoute.Favorite)
        .reply(HttpCode.Ok, fakeBackendOffers);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchFavoriteOffersAction());

      expect(store.getActions()).toEqual([
        loadFavoriteOffers(adaptMultipleToClient(fakeBackendOffers)),
        setFavoriteOffersLoadingStatus(LoadingStatus.Succeeded),
      ]);
    });

    it('should change favoriteOffersLoadingStatus to failed when GET / favoriteOffers', async () => {
      const store = mockStore();

      mockAPI
        .onGet(APIRoute.Favorite)
        .reply(HttpCode.NotFound, []);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchFavoriteOffersAction());

      expect(store.getActions()).toEqual([
        setFavoriteOffersLoadingStatus(LoadingStatus.Failed),
      ]);
    });

  });

  describe('Changing offer favorite status actions', () => {

    it('should get updated offer and change toggleIsFavoriteLoadingStatus when POST /favorites', async () => {
      const store = mockStore();

      mockAPI
        .onPost((`${APIRoute.Favorite}/${FakeParamsData.OfferId}/${FakeParamsData.Status}`))
        .reply(HttpCode.Ok, fakeBackendOffer);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(toggleIsFavoriteAction(+FakeParamsData.OfferId, FakeParamsData.Status));

      expect(store.getActions()).toEqual([
        updateOffer(adaptSingleToClient(fakeBackendOffer)),
        setToggleIsFavoriteLoadingStatus(LoadingStatus.Succeeded),
      ]);
    });

    it('should change toggleIsFavoriteLoadingStatus to failed if not authorized when POST /favorites', async () => {
      const store = mockStore();

      mockAPI
        .onPost((`${APIRoute.Favorite}/${FakeParamsData.OfferId}/${FakeParamsData.Status}`))
        .reply(HttpCode.Unauthorized, []);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(toggleIsFavoriteAction(+FakeParamsData.OfferId, FakeParamsData.Status));

      expect(store.getActions()).toEqual([
        setToggleIsFavoriteLoadingStatus(LoadingStatus.Failed),
        redirectToRoute(AppRoute.SignIn),
      ]);
    });

  });

  describe('Fetching offer reviews actions', () => {

    it('should load offer reviews and change offerReviewsLoadingStatus when GET /comments/id', async () => {
      const store = mockStore();

      mockAPI
        .onGet(`${APIRoute.Reviews}/${FakeParamsData.OfferId}`)
        .reply(HttpCode.Ok, fakeBackendReviews);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchOfferReviewsAction(FakeParamsData.OfferId));

      expect(store.getActions())
        .toEqual([
          loadOfferReviews(adaptSomeReviewsToClient(fakeBackendReviews)),
          setOfferReviewsLoadingStatus(LoadingStatus.Succeeded),
        ]);
    });

    it('should change offerReviewsLoadingStatus to failed when GET /comments/id', async () => {
      const store = mockStore();

      mockAPI
        .onGet(`${APIRoute.Reviews}/${FakeParamsData.OfferId}`)
        .reply(HttpCode.BadRequest, []);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchOfferReviewsAction(FakeParamsData.OfferId));

      expect(store.getActions())
        .toEqual([
          setOfferReviewsLoadingStatus(LoadingStatus.Failed),
        ]);
    });

  });

  describe('Posting offer review actions', () => {

    it('should load offer reviews, change setReviewLoadingStatus when POST /comments/id', async() => {
      const store = mockStore();

      mockAPI
        .onPost(`${APIRoute.Reviews}/${FakeParamsData.OfferId}`)
        .reply(HttpCode.Ok,  fakeBackendReviews);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(postOfferReviewAction(FakeParamsData.OfferId, fakePostReview));

      expect(store.getActions())
        .toEqual([
          setReviewLoadingStatus(LoadingStatus.Loading),
          loadOfferReviews(adaptSomeReviewsToClient(fakeBackendReviews)),
          setReviewLoadingStatus(LoadingStatus.Succeeded),
        ]);
    });

    it('should change setReviewLoadingStatus to failed when POST /comments/id', async() => {
      const store = mockStore();

      mockAPI
        .onPost(`${APIRoute.Reviews}/${FakeParamsData.OfferId}`)
        .reply(HttpCode.BadRequest,  []);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(postOfferReviewAction(FakeParamsData.OfferId, fakePostReview));

      expect(store.getActions())
        .toEqual([
          setReviewLoadingStatus(LoadingStatus.Loading),
          setReviewLoadingStatus(LoadingStatus.Failed),
        ]);
    });

  });

  describe('Fetching nearby offers actions', () => {

    it('should load nearby offers and change nearbyOffersLoadingStatus when GET /hotels/id/nearby', async () => {
      const store = mockStore();

      mockAPI
        .onGet(`${APIRoute.Hotels}/${FakeParamsData.OfferId}/nearby`)
        .reply(HttpCode.Ok, fakeBackendOffers);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchNearbyOffersAction(FakeParamsData.OfferId));

      expect(store.getActions())
        .toEqual([
          loadNearbyOffers(adaptMultipleToClient(fakeBackendOffers)),
          setNearbyOffersLoadingStatus(LoadingStatus.Succeeded),
        ]);
    });

    it('should change nearbyOffersLoadingStatus to failed when GET /hotels/id/nearby', async () => {
      const store = mockStore();

      mockAPI
        .onGet(`${APIRoute.Hotels}/${FakeParamsData.OfferId}/nearby`)
        .reply(HttpCode.NotFound, []);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchNearbyOffersAction(FakeParamsData.OfferId));

      expect(store.getActions())
        .toEqual([
          setNearbyOffersLoadingStatus(LoadingStatus.Failed),
        ]);
    });

  });

});
