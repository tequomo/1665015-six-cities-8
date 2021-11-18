import { AxiosInstance } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppRoutes, AuthStatus, LoadingStatus } from '../const';
import { AuthUserData } from './auth-data';
import { OfferType } from './offer-type';
import { PostReviewType, ReviewType } from './review-type';
import { State } from './state';

export enum ActionType {
  SelectCity = 'main/selectCity',
  FilterOffers = 'main/filterOffers',
  ResetState = 'main/resetState',
  SelectSorting = 'main/selectSorting',
  LoadOffers = 'data/loadOffers',
  LoadCurrentOffer = 'data/loadCurrentOffer',
  LoadOfferReviews = 'data/loadOfferReviews',
  LoadNearbyOffers = 'data/loadNearbyOffers',
  LoadFavoriteOffers = 'data/loadFavoriteOffers',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'main/redirectToRoute',
  ReceiveAuthData = 'user/receiveAuthData',
  SetCurrentOfferLoadingStatus = 'data/setCurrentOfferLoadingStatus',
  SetOfferReviewsLoadingStatus = 'data/setOfferReviewsLoadingStatus',
  SetFavoriteOffersLoadingStatus = 'data/setFavoriteOffersLoadingStatus',
  SendOfferReview = 'data/sendOfferReview',
  ToggleIsFavorite = 'data/toggleFavorite',
  SetToggleIsFavoriteLoadingStatus = 'data/setToggleIsFavoriteLoadingStatus',
  SetReviewLoadingStatus = 'data/setReviewLoadingStatus',
}

export type SelectCityAction = {
  type: ActionType.SelectCity,
  payload: string,
}

export type FilterOffersAction = {
  type: ActionType.FilterOffers,
  payload: OfferType[],
}

export type ResetStateAction = {
  type: ActionType.ResetState,
}

export type SelectSortingAction = {
  type: ActionType.SelectSorting,
  payload: string,
}

export type LoadOffersAction = {
  type: ActionType.LoadOffers,
  payload: OfferType[],
}

export type LoadCurrentOfferAction = {
  type: ActionType.LoadCurrentOffer,
  payload: OfferType,
}

export type LoadOfferReviewsAction = {
  type: ActionType.LoadOfferReviews,
  payload: ReviewType[],
}

export type LoadNearbyOffersAction = {
  type: ActionType.LoadNearbyOffers,
  payload: OfferType[],
}

export type LoadFavoriteOffersAction = {
  type: ActionType.LoadFavoriteOffers,
  payload: OfferType[],
}

export type RequireAuthorizationAction = {
  type: ActionType.RequireAuthorization,
  payload: AuthStatus,
}

export type RequireLogoutAction = {
  type: ActionType.RequireLogout,
}

export type RedirectToRouteAction = {
  type: ActionType.RedirectToRoute,
  payload: AppRoutes,
}

export type ReceiveAuthDataAction = {
  type: ActionType.ReceiveAuthData,
  payload: AuthUserData,
}

export type SetCurrentOfferLoadingStatusAction = {
  type: ActionType.SetCurrentOfferLoadingStatus,
  payload: LoadingStatus,
}

export type SetOfferReviewsLoadingStatusAction = {
  type: ActionType.SetOfferReviewsLoadingStatus,
  payload: LoadingStatus,
}

export type SetFavoriteOffersLoadingStatusAction = {
  type: ActionType.SetFavoriteOffersLoadingStatus,
  payload: LoadingStatus,
}

export type SetToggleIsFavoriteLoadingStatusAction = {
  type: ActionType.SetToggleIsFavoriteLoadingStatus,
  payload: LoadingStatus,
}

export type ToggleIsFavoriteAction = {
  type: ActionType.ToggleIsFavorite,
  payload: OfferType;
}

export type SendOfferReviewAction = {
  type: ActionType.SendOfferReview,
  payload: PostReviewType,
}

export type SetReviewLoadingStatusAction = {
  type: ActionType.SetReviewLoadingStatus;
  payload: LoadingStatus,
}

export type Actions =
  | SelectCityAction
  | FilterOffersAction
  | ResetStateAction
  | SelectSortingAction
  | LoadOffersAction
  | LoadCurrentOfferAction
  | LoadOfferReviewsAction
  | LoadNearbyOffersAction
  | LoadFavoriteOffersAction
  | RequireAuthorizationAction
  | RequireLogoutAction
  | RedirectToRouteAction
  | ReceiveAuthDataAction
  | SetCurrentOfferLoadingStatusAction
  | SetOfferReviewsLoadingStatusAction
  | SetFavoriteOffersLoadingStatusAction
  | ToggleIsFavoriteAction
  | SendOfferReviewAction
  | SetReviewLoadingStatusAction
  | SetToggleIsFavoriteLoadingStatusAction;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
