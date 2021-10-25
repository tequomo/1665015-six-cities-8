import { OfferType } from './offer-type';

export enum ActionType {
  SelectCity = 'main/SelectCity',
  LoadOffers = 'main/LoadOffers',
}

export type SelectCityAction = {
  type: ActionType.SelectCity,
  payload: string,
}

export type LoadOffersAction = {
  type: ActionType.LoadOffers,
  payload: OfferType[],
}

export type Actions = SelectCityAction | LoadOffersAction;
