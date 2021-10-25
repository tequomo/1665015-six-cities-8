import { ActionType, LoadOffersAction, SelectCityAction } from '../types/action';
import { OfferType } from '../types/offer-type';

export const selectCity = (selectedCity:string ): SelectCityAction => ({
  type: ActionType.SelectCity,
  payload: selectedCity,
} as const);

export const loadOffers = (offers: OfferType[]): LoadOffersAction => ({
  type: ActionType.LoadOffers,
  payload: offers,
} as const);
