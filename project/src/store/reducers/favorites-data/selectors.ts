import { createSelector } from 'reselect';
import { LoadingStatus } from '../../../const';
import { OfferType } from '../../../types/offer-type';
import { State } from '../../../types/state';
import { NameSpace } from '../root-reducer';

export const getFavoriteOffers = (state: State): OfferType[] => state[NameSpace.favoriteOffers].favoriteOffers;
export const getFavoriteOffersLoadingStatus = (state: State): LoadingStatus => state[NameSpace.favoriteOffers].favoriteOffersLoadingStatus;

export const getFavoriteCities = createSelector(
  getFavoriteOffers,
  (favoriteOffers) => [...new Set(
    favoriteOffers
      .map(
        (favorite) => favorite.city.name),
  )]
    .sort(),
);
