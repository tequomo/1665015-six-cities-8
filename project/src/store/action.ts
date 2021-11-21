import { createAction } from '@reduxjs/toolkit';
import { AppRoutes, AuthStatus, LoadingStatus } from '../const';
import { ActionType } from '../types/action';
import { AuthUserData } from '../types/auth-data';
import { OfferType } from '../types/offer-type';
import { ReviewType } from '../types/review-type';


export const selectCity = createAction(
  ActionType.SelectCity,
  (selectedCity:string) => ({
    payload: selectedCity,
  }),
);

export const filterOffers = createAction(
  ActionType.FilterOffers,
  (offers: OfferType[]) => ({
    payload: offers,
  }),
);


export const selectSorting = createAction(
  ActionType.SelectSorting,
  (currentSortingType: string) => ({
    payload: currentSortingType,
  }),
);

export const loadOffers = createAction(
  ActionType.LoadOffers,
  (offers: OfferType[]) => ({
    payload: offers,
  }),
);

export const loadCurrentOffer = createAction(
  ActionType.LoadCurrentOffer,
  (currentOffer: OfferType) => ({
    payload: currentOffer,
  }),
);

export const loadOfferReviews = createAction(
  ActionType.LoadOfferReviews,
  (offerReviews: ReviewType[]) => ({
    payload: offerReviews,
  }),
);

export const setOffersLoadingStatus = createAction(
  ActionType.SetOffersLoadingStatus,
  (offersLoadingStatus: LoadingStatus) => ({
    payload: offersLoadingStatus,
  }),
);

export const setCurrentOfferLoadingStatus = createAction(
  ActionType.SetCurrentOfferLoadingStatus,
  (currentOfferLoadingStatus: LoadingStatus) => ({
    payload: currentOfferLoadingStatus,
  }),
);

export const setOfferReviewsLoadingStatus = createAction(
  ActionType.SetOfferReviewsLoadingStatus,
  (offerReviewsLoadingStatus: LoadingStatus) => ({
    payload: offerReviewsLoadingStatus,
  }),
);

export const setReviewLoadingStatus = createAction(
  ActionType.SetReviewLoadingStatus,
  (reviewLoadingStatus: LoadingStatus) => ({
    payload: reviewLoadingStatus,
  }),
);

export const setFavoriteOffersLoadingStatus = createAction(
  ActionType.SetFavoriteOffersLoadingStatus,
  (favoriteOffersLoadingStatus: LoadingStatus) => ({
    payload: favoriteOffersLoadingStatus,
  }),
);
export const setToggleIsFavoriteLoadingStatus = createAction(
  ActionType.SetToggleIsFavoriteLoadingStatus,
  (toggleIsFavoriteLoadingStatus: LoadingStatus) => ({
    payload: toggleIsFavoriteLoadingStatus,
  }),
);

export const loadNearbyOffers = createAction(
  ActionType.LoadNearbyOffers,
  (nearbyOffers: OfferType[]) => ({
    payload: nearbyOffers,
  }),
);

export const setNearbyOffersLoadingStatus = createAction(
  ActionType.SetToggleIsFavoriteLoadingStatus,
  (toggleIsFavoriteLoadingStatus: LoadingStatus) => ({
    payload: toggleIsFavoriteLoadingStatus,
  }),
);

export const loadFavoriteOffers = createAction(
  ActionType.LoadFavoriteOffers,
  (favoriteOffers: OfferType[]) => ({
    payload: favoriteOffers,
  }),
);

export const toggleIsFavorite = createAction(
  ActionType.LoadFavoriteOffers,
  (favoriteOffers: OfferType[]) => ({
    payload: favoriteOffers,
  }),
);

export const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthStatus) => ({
    payload: authStatus,
  }),
);

export const requireLogout = createAction(ActionType.RequireLogout);

export const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: AppRoutes) => ({
    payload: url,
  }),
);

export const receiveAuthData = createAction(
  ActionType.ReceiveAuthData,
  (authUserData: AuthUserData) => ({
    payload: authUserData,
  }),
);
