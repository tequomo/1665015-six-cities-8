import { AxiosInstance } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AuthStatus } from '../const';
import { OfferType } from './offer-type';
import { State } from './state';

export enum ActionType {
  SelectCity = 'main/selectCity',
  FilterOffers = 'main/filterOffers',
  ResetState = 'main/resetState',
  SelectSorting = 'main/selectSorting',
  LoadOffers = 'data/loadOffers',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
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

export type RequireAuthorization = {
  type: ActionType.RequireAuthorization,
  payload: AuthStatus,
}

export type RequireLogout = {
  type: ActionType.RequireLogout,
}

export type Actions =
  | SelectCityAction
  | FilterOffersAction
  | ResetStateAction
  | SelectSortingAction
  | LoadOffersAction
  | RequireAuthorization
  | RequireLogout;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
