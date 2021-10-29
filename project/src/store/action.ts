import { ActionType, FilterOffersAction, ResetStateAction, SelectCityAction, SelectSortingAction } from '../types/action';
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

export const selectSorting = (currentSortingType: string): SelectSortingAction => ({
  type: ActionType.SelectSorting,
  payload: currentSortingType,
} as const);

