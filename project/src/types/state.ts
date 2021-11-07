import { AuthStatus } from '../const';
import { AuthUserData } from './auth-data';
import { OfferType } from './offer-type';

export type State = {
  selectedCity: string,
  offers: OfferType[],
  nearbyOffers: OfferType[],
  currentSortingType: string,
  authStatus: AuthStatus,
  isDataLoaded: boolean,
  isNearbyLoaded: boolean,
  authUserData: AuthUserData | null,
}
