import { AuthStatus, LoadingStatus } from '../const';
import { RootState } from '../store/reducers/root-reducer';
import { AuthUserData } from './auth-data';
import { OfferType } from './offer-type';
import { ReviewType } from './review-type';


export type UserAuth = {
  authStatus: AuthStatus,
  authUserData: AuthUserData | null,
}

export type OffersData = {
  offers: OfferType[],
  offersLoadingStatus: LoadingStatus,
}

export type CurrentOfferData = {
  currentOffer: OfferType | null,
  currentOfferLoadingStatus: LoadingStatus,
}

export type NearbyData = {
  nearbyOffers: OfferType[],
  nearbyOffersLoadingStatus: LoadingStatus,
}

export type ReviewsData = {
  offerReviews: ReviewType[],
  offerReviewsLoadingStatus: LoadingStatus,
  reviewLoadingStatus: LoadingStatus,
}

export type FavoritesData = {
  favoriteOffers: OfferType[],
  favoriteOffersLoadingStatus: LoadingStatus,
  toggleIsFavoriteLoadingStatus: LoadingStatus,
}

export type AppState = {
  selectedCity: string,
  currentSortingType: string,
}

export type State = RootState;
