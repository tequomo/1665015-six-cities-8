import { OfferType } from './offer-type';

export enum ActionType {
  SelectCity = 'main/SelectCity',
  FilterOffers = 'main/FilterOffers',
  ResetState = 'main/ResetState',
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

export type Actions = SelectCityAction | FilterOffersAction | ResetStateAction;
