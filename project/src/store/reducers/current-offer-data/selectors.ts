import { LoadingStatus } from '../../../const';
import { OfferType } from '../../../types/offer-type';
import { State } from '../../../types/state';
import { NameSpace } from '../root-reducer';


export const getCurrentOffer = (state: State): OfferType | null => state[NameSpace.currentOffer].currentOffer;
export const getCurrentOfferLoadingStatus = (state: State): LoadingStatus => state[NameSpace.currentOffer].currentOfferLoadingStatus;
