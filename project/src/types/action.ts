import { AxiosInstance } from 'axios';
import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { State } from './state';

export enum ActionType {
  SelectCity = 'main/selectCity',
  FilterOffers = 'main/filterOffers',
  SelectSorting = 'main/selectSorting',
  LoadOffers = 'data/loadOffers',
  SetOffersLoadingStatus = 'data/setOffersLoadingStatus',
  LoadCurrentOffer = 'data/loadCurrentOffer',
  SetCurrentOfferLoadingStatus = 'data/setCurrentOfferLoadingStatus',
  LoadOfferReviews = 'data/loadOfferReviews',
  SetOfferReviewsLoadingStatus = 'data/setOfferReviewsLoadingStatus',
  SendOfferReview = 'data/sendOfferReview',
  SetReviewLoadingStatus = 'data/setReviewLoadingStatus',
  LoadNearbyOffers = 'data/loadNearbyOffers',
  SetNearbyOffersLoadingStatus = 'data/setNearbyOffersLoadingStatus',
  LoadFavoriteOffers = 'data/loadFavoriteOffers',
  SetFavoriteOffersLoadingStatus = 'data/setFavoriteOffersLoadingStatus',
  ToggleIsFavorite = 'data/toggleFavorite',
  SetToggleIsFavoriteLoadingStatus = 'data/setToggleIsFavoriteLoadingStatus',
  RequireAuthorization = 'user/requireAuthorization',
  ReceiveAuthData = 'user/receiveAuthData',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'main/redirectToRoute',
  UpdateOffer = 'data/updateOffer',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
