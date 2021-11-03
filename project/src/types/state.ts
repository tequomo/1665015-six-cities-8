import { AuthStatus } from '../const';
import { OfferType } from './offer-type';

export type State = {
  selectedCity: string,
  offers: OfferType[],
  currentSortingType: string,
  authStatus: AuthStatus,
  isDataLoaded: boolean,
}
