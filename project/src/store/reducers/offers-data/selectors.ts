import { createSelector } from 'reselect';
import { LoadingStatus } from '../../../const';
import { OfferType } from '../../../types/offer-type';
import { State } from '../../../types/state';
import { getSelectedCityOffers, sortingOffers } from '../../../utils';
import { getCurrentSortingType, getSelectedCity } from '../app-state/selectors';
import { NameSpace } from '../root-reducer';


export const getOffers = (state: State): OfferType[] => state[NameSpace.offers].offers;
export const getOffersLoadingStatus = (state: State): LoadingStatus => state[NameSpace.offers].offersLoadingStatus;

export const getFilteredOffers = createSelector(
  getOffers,
  getSelectedCity,
  (offers, selectedCity) => getSelectedCityOffers(offers, selectedCity),
);

export const getSortedOffers = createSelector(
  getCurrentSortingType,
  getFilteredOffers,
  (currentSortingType, offers) => sortingOffers(currentSortingType, offers),
);
