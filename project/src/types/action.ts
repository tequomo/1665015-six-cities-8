import { OfferType } from './offer-type';

export enum ActionType {
  SelectCity = 'main/SelectCity',
  LoadOffers = 'main/LoadOffers',
  ResetState = 'main/ResetState',
}

export type SelectCityAction = {
  type: ActionType.SelectCity,
  payload: string,
}

export type LoadOffersAction = {
  type: ActionType.LoadOffers,
  payload: OfferType[],
}

export type ResetStateAction = {
  type: ActionType.ResetState,
}

export type Actions = SelectCityAction | LoadOffersAction | ResetStateAction;
