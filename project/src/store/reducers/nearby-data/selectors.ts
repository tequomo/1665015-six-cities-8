import { LoadingStatus } from '../../../const';
import { OfferType } from '../../../types/offer-type';
import { State } from '../../../types/state';
import { NameSpace } from '../root-reducer';

export const getNearbyOffers = (state: State): OfferType[] => state[NameSpace.nearbyOffers].nearbyOffers;
export const getNearbyOffersLoadingStatus = (state: State): LoadingStatus => state[NameSpace.nearbyOffers].nearbyOffersLoadingStatus;
