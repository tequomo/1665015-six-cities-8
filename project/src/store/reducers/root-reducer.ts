import { combineReducers } from 'redux';
import { userAuth } from './user-auth/user-auth';
import { offersData } from './offers-data/offers-data';
import { currentOfferData } from './current-offer-data/current-offer-data';
import { nearbyData } from './nearby-data/nearby-data';
import { favoritesData } from './favorites-data/favorites-data';
import { reviewsData } from './reviews-data/reviews-data';
import { appState } from './app-state/app-state';

export enum NameSpace {
  auth = 'USER_AUTH',
  offers = 'OFFERS_DATA',
  currentOffer = 'CURRENT_OFFER_DATA',
  nearbyOffers = 'NEARBY_DATA',
  favoriteOffers = 'FAVORITES_DATA',
  reviews = 'REVIEWS_DATA',
  state = 'STATE',

}

export const rootReducer = combineReducers({
  [NameSpace.auth]: userAuth,
  [NameSpace.offers]: offersData,
  [NameSpace.nearbyOffers]: nearbyData,
  [NameSpace.favoriteOffers]: favoritesData,
  [NameSpace.currentOffer]: currentOfferData,
  [NameSpace.reviews]: reviewsData,
  [NameSpace.state]: appState,
});

export type RootState = ReturnType<typeof rootReducer>;
