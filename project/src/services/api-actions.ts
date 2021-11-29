import { toast } from 'react-toastify';
import { APIRoute, AppRoute, AuthStatus, LoadingStatus, Messages } from '../const';
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
import { ThunkActionResult } from '../types/action';
import { AuthDataRequest, AuthDataResponse } from '../types/auth-data';
import { BackendOfferType } from '../types/offer-type';
import { BackendReviewType, PostReviewType } from '../types/review-type';
import { adaptSingleToClient, adaptMultipleToClient, adaptAuthDataToClient, adaptSomeReviewsToClient } from './adapter';
import { dropToken, saveToken } from './token';


export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<BackendOfferType[]>(APIRoute.Hotels);
      dispatch(loadOffers(adaptMultipleToClient(data)));
      dispatch(setOffersLoadingStatus(LoadingStatus.Succeeded));
    } catch {
      dispatch(setOffersLoadingStatus(LoadingStatus.Failed));
      toast.error(Messages.OFFER_LOADING_ERROR);
    }
  };

export const fetchCurrentOfferAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<BackendOfferType>(`${APIRoute.Hotels}/${id}`);
      dispatch(loadCurrentOffer(adaptSingleToClient(data)));
      dispatch(setCurrentOfferLoadingStatus(LoadingStatus.Succeeded));
    } catch {
      dispatch(setCurrentOfferLoadingStatus(LoadingStatus.Failed));
      toast.error(Messages.OFFER_LOADING_ERROR);
    }
  };

export const fetchFavoriteOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<BackendOfferType[]>(APIRoute.Favorite);
      dispatch(loadFavoriteOffers(adaptMultipleToClient(data)));
      dispatch(setFavoriteOffersLoadingStatus(LoadingStatus.Succeeded));
    } catch {
      dispatch(setFavoriteOffersLoadingStatus(LoadingStatus.Failed));
    }
  };

export const toggleIsFavoriteAction = (id: number, favoriteStatus: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.post<BackendOfferType>((`${APIRoute.Favorite}/${id}/${favoriteStatus}`));
      dispatch(updateOffer(adaptSingleToClient(data)));
      dispatch(setToggleIsFavoriteLoadingStatus(LoadingStatus.Succeeded));
    } catch {
      dispatch(setToggleIsFavoriteLoadingStatus(LoadingStatus.Failed));
      dispatch(redirectToRoute(AppRoute.SignIn));
      toast.warning(Messages.FAVORITE_NO_AUTH);
    }
  };


export const fetchOfferReviewsAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<BackendReviewType[]>(`${APIRoute.Reviews}/${id}`);
      dispatch(loadOfferReviews(adaptSomeReviewsToClient(data)));
      dispatch(setOfferReviewsLoadingStatus(LoadingStatus.Succeeded));
    } catch {
      dispatch(setOfferReviewsLoadingStatus(LoadingStatus.Failed));
    }
  };

export const postOfferReviewAction = (id: string, { comment, rating }: PostReviewType): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      dispatch(setReviewLoadingStatus(LoadingStatus.Loading));
      const { data } =  await api.post((`${APIRoute.Reviews}/${id}`), { comment, rating });
      dispatch(loadOfferReviews(adaptSomeReviewsToClient(data)));
      dispatch(setReviewLoadingStatus(LoadingStatus.Succeeded));
    } catch {
      dispatch(setReviewLoadingStatus(LoadingStatus.Failed));
      toast.error(Messages.REVIEW_POST_ERROR);
    }
  };

export const fetchNearbyOffersAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<BackendOfferType[]>(`${APIRoute.Hotels}/${id}${APIRoute.Nearby}`);
      dispatch(loadNearbyOffers(adaptMultipleToClient(data)));
      dispatch(setNearbyOffersLoadingStatus(LoadingStatus.Succeeded));
    } catch {
      dispatch(setNearbyOffersLoadingStatus(LoadingStatus.Failed));
      toast.error(Messages.OFFER_LOADING_ERROR);
    }
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.get<AuthDataResponse>(APIRoute.Login);
      dispatch(requireAuthorization(AuthStatus.Auth));
      dispatch(receiveAuthData(adaptAuthDataToClient(data)));
    } catch {
      dispatch(requireAuthorization(AuthStatus.NoAuth));
      toast.info(Messages.AUTH_INFO);
    }
  };

export const loginAction = ({login: email, password}: AuthDataRequest): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.post<AuthDataResponse>(APIRoute.Login, {email, password});
      saveToken(data.token);
      dispatch(requireAuthorization(AuthStatus.Auth));
      dispatch(receiveAuthData(adaptAuthDataToClient(data)));
      dispatch(redirectToRoute(AppRoute.Main));
    } catch {
      toast.error(Messages.AUTH_FAIL);
    }
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };
