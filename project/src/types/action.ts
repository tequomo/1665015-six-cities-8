import { AxiosInstance } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppRoutes, AuthStatus } from '../const';
import { AuthUserData } from './auth-data';
import { OfferType } from './offer-type';
import { State } from './state';

export enum ActionType {
  SelectCity = 'main/selectCity',
  FilterOffers = 'main/filterOffers',
  ResetState = 'main/resetState',
  SelectSorting = 'main/selectSorting',
  LoadOffers = 'data/loadOffers',
  LoadCurrentOffer = 'data/loadCurrentOffer',
  LoadNearbyOffers = 'data/loadNearbyOffers',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'main/redirectToRoute',
  ReceiveAuthData = 'user/receiveAuthData',
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

export type LoadNearbyOffersAction = {
  type: ActionType.LoadNearbyOffers,
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

export type Actions =
  | SelectCityAction
  | FilterOffersAction
  | ResetStateAction
  | SelectSortingAction
  | LoadOffersAction
  | LoadCurrentOfferAction
  | LoadNearbyOffersAction
  | RequireAuthorizationAction
  | RequireLogoutAction
  | RedirectToRouteAction
  | ReceiveAuthDataAction;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
