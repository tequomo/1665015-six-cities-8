import { AuthStatus } from '../const';
import { ActionType, FilterOffersAction, LoadCurrentOfferAction, LoadNearbyOffersAction, LoadOffersAction, RequireAuthorization, RequireLogout, ResetStateAction, SelectCityAction, SelectSortingAction } from '../types/action';
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

export const loadOffers = (offers: OfferType[]): LoadOffersAction => ({
  type: ActionType.LoadOffers,
  payload: offers,
} as const);

export const loadCurrentOffer = (currentOffer: OfferType): LoadCurrentOfferAction => ({
  type: ActionType.LoadCurrentOffer,
  payload: currentOffer,
} as const);

export const loadNearbyOffers = (nearbyOffers: OfferType[]): LoadNearbyOffersAction => ({
  type: ActionType.LoadNearbyOffers,
  payload: nearbyOffers,
} as const);

export const requireAuthorization = (authStatus: AuthStatus): RequireAuthorization => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireLogout = (): RequireLogout => ({
  type: ActionType.RequireLogout,
} as const);
