import { AxiosInstance } from 'axios';
import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppRoutes, AuthStatus, LoadingStatus } from '../const';
import { AuthUserData } from './auth-data';
import { OfferType } from './offer-type';
import { PostReviewType, ReviewType } from './review-type';
import { State } from './state';

export enum ActionType {
  SelectCity = 'main/selectCity',
  FilterOffers = 'main/filterOffers',
  SelectSorting = 'main/selectSorting',
  LoadOffers = 'data/loadOffers',
  SetOffersLoadingStatus = 'data/setOffersLoadingStatus',
  LoadCurrentOffer = 'data/loadCurrentOffer',
  SetCurrentOfferLoadingStatus = 'data/setCurrentOfferLoadingStatus',
  LoadOfferReviews = 'data/loadOfferReviews',
  SetOfferReviewsLoadingStatus = 'data/setOfferReviewsLoadingStatus',
  SendOfferReview = 'data/sendOfferReview',
  SetReviewLoadingStatus = 'data/setReviewLoadingStatus',
  LoadNearbyOffers = 'data/loadNearbyOffers',
  SetNearbyOffersLoadingStatus = 'data/setNearbyOffersLoadingStatus',
  LoadFavoriteOffers = 'data/loadFavoriteOffers',
  SetFavoriteOffersLoadingStatus = 'data/setFavoriteOffersLoadingStatus',
  ToggleIsFavorite = 'data/toggleFavorite',
  SetToggleIsFavoriteLoadingStatus = 'data/setToggleIsFavoriteLoadingStatus',
  RequireAuthorization = 'user/requireAuthorization',
  ReceiveAuthData = 'user/receiveAuthData',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'main/redirectToRoute',
  UpdateOffer = 'data/updateOffer',
}

export type SelectCityAction = {
  type: ActionType.SelectCity,
  payload: string,
}

export type FilterOffersAction = {
  type: ActionType.FilterOffers,
  payload: OfferType[],
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

export type SetOffersLoadingStatusAction = {
  type: ActionType.SetOffersLoadingStatus,
  payload: LoadingStatus,
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

export type SetNearbyOffersLoadingStatusAction = {
  type: ActionType.SetNearbyOffersLoadingStatus,
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

export type UpdateOfferAction = {
  type: ActionType.UpdateOffer,
  payload: OfferType,
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
