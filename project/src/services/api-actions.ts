import { toast } from 'react-toastify';
import { APIRoutes, AuthStatus, LoadingStatus } from '../const';
import { loadCurrentOffer, loadFavoriteOffers, loadNearbyOffers, loadOfferReviews, loadOffers, receiveAuthData, requireAuthorization, requireLogout, setCurrentOfferLoadingStatus, setFavoriteOffersLoadingStatus, setOfferReviewsLoadingStatus, setReviewLoadingStatus, setToggleIsFavoriteLoadingStatus } from '../store/action';
import { ThunkActionResult } from '../types/action';
import { AuthDataRequest, AuthDataResponse } from '../types/auth-data';
import { BackendOfferType } from '../types/offer-type';
import { BackendReviewType, PostReviewType } from '../types/review-type';
import { adaptSingleToClient, adaptMultipleToClient, adaptAuthDataToClient, adaptSomeReviewsToClient } from './adapter';
import { dropToken, saveToken } from './token';

const AUTH_FAIL_MESSAGE = 'Не забудьте авторизоваться';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<BackendOfferType[]>(APIRoutes.Hotels);
    dispatch(loadOffers(adaptMultipleToClient(data)));
  };

export const fetchCurrentOfferAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<BackendOfferType>(`${APIRoutes.Hotels}/${id}`);
      dispatch(loadCurrentOffer(adaptSingleToClient(data)));
    } catch {
      dispatch(setCurrentOfferLoadingStatus(LoadingStatus.Failed));
    }
  };

export const fetchFavoriteOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<BackendOfferType[]>(APIRoutes.Favorite);
      dispatch(loadFavoriteOffers(adaptMultipleToClient(data)));
    } catch {
      dispatch(setFavoriteOffersLoadingStatus(LoadingStatus.Failed));
    }
  };

export const toggleIsFavoriteAction = (id: number, favoriteStatus: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.post<BackendOfferType>(`${APIRoutes.Favorite}/${id}/${favoriteStatus}`);
      dispatch(loadCurrentOffer(adaptSingleToClient(data)));
      dispatch(setToggleIsFavoriteLoadingStatus(LoadingStatus.Succeeded));
    } catch {
      dispatch(setToggleIsFavoriteLoadingStatus(LoadingStatus.Failed));
    }
  };

export const fetchOfferReviewsAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<BackendReviewType[]>(`${APIRoutes.Reviews}/${id}`);
      dispatch(loadOfferReviews(adaptSomeReviewsToClient(data)));
    } catch {
      dispatch(setOfferReviewsLoadingStatus(LoadingStatus.Failed));
    }
  };

export const postOfferReviewAction = (id: string, { comment, rating }: PostReviewType): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } =  await api.post((`${APIRoutes.Reviews}/${id}`), { comment, rating });
    dispatch(loadOfferReviews(adaptSomeReviewsToClient(data)));
    dispatch(setReviewLoadingStatus(LoadingStatus.Succeeded));
  };

export const fetchNearbyOffersAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<BackendOfferType[]>(`${APIRoutes.Hotels}/${id}${APIRoutes.Nearby}`);
    dispatch(loadNearbyOffers(adaptMultipleToClient(data)));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.get<AuthDataResponse>(APIRoutes.Login);
      dispatch(requireAuthorization(AuthStatus.Auth));
      dispatch(receiveAuthData(adaptAuthDataToClient(data)));
    } catch {
      dispatch(requireAuthorization(AuthStatus.NoAuth));
      toast.info(AUTH_FAIL_MESSAGE);
    }
  };

export const loginAction = ({login: email, password}: AuthDataRequest): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.post<AuthDataResponse>(APIRoutes.Login, {email, password});
    saveToken(data.token);
    dispatch(requireAuthorization(AuthStatus.Auth));
    dispatch(receiveAuthData(adaptAuthDataToClient(data)));
  };


export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoutes.Logout);
    dropToken();
    dispatch(requireLogout());
  };
