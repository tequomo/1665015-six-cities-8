import { LoadingStatus } from '../../../const';
import { OfferType } from '../../../types/offer-type';
import { State } from '../../../types/state';
import { NameSpace } from '../root-reducer';


export const getOffers = (state: State): OfferType[] => state[NameSpace.offers].offers;
export const getOffersLoadingStatus = (state: State): LoadingStatus => state[NameSpace.offers].offersLoadingStatus;
