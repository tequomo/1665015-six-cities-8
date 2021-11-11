import { AuthStatus, LoadingStatus } from '../const';
import { AuthUserData } from './auth-data';
import { OfferType } from './offer-type';
import { ReviewType } from './review-type';

export type State = {
  selectedCity: string,
  offers: OfferType[],
  currentOffer: OfferType | null,
  offerReviews: ReviewType[],
  nearbyOffers: OfferType[],
  favoriteOffers: OfferType[],
  currentSortingType: string,
  authStatus: AuthStatus,
  isDataLoaded: boolean,
  isCurrentOfferLoaded: boolean,
  isNearbyLoaded: boolean,
  authUserData: AuthUserData | null,
  currentOfferLoadingStatus: LoadingStatus,
  offerReviewsLoadingStatus: LoadingStatus,
  favoriteOffersLoadingStatus: LoadingStatus,
}
