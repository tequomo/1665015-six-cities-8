import { ActionType, FilterOffersAction, ResetStateAction, SelectCityAction } from '../types/action';
import { OfferType } from '../types/offer-type';

export const selectCity = (selectedCity:string ): SelectCityAction => ({
  type: ActionType.SelectCity,
  payload: selectedCity,
} as const);

export const filterOffers = (offers: OfferType[]): FilterOffersAction => ({
  type: ActionType.FilterOffers,
  payload: offers,
} as const);

export const resetState = (): ResetStateAction => ({
  type: ActionType.ResetState,
} as const);

