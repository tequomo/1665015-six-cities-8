import { AppRoutes, AuthStatus, LoadingStatus } from '../const';
import { ActionType, FilterOffersAction, LoadCurrentOfferAction, LoadFavoriteOffersAction, LoadNearbyOffersAction, LoadOfferReviewsAction, LoadOffersAction, ReceiveAuthDataAction, RedirectToRouteAction, RequireAuthorizationAction, RequireLogoutAction, ResetStateAction, SelectCityAction, SelectSortingAction, SetCurrentOfferLoadingStatusAction, SetFavoriteOffersLoadingStatusAction, SetOfferReviewsLoadingStatusAction, SetReviewLoadingStatusAction, SetToggleIsFavoriteLoadingStatusAction } from '../types/action';
import { AuthUserData } from '../types/auth-data';
import { OfferType } from '../types/offer-type';
import { ReviewType } from '../types/review-type';

export const selectCity = (selectedCity:string ): SelectCityAction => ({
  type: ActionType.SelectCity,
  payload: selectedCity,
} as const);

export const filterOffers = (offers: OfferType[]): FilterOffersAction => ({
  type: ActionType.FilterOffers,
  payload: offers,
} as const);

export const resetState = (): ResetStateAction => ({
  type: ActionType.ResetState,
} as const);

export const selectSorting = (currentSortingType: string): SelectSortingAction => ({
  type: ActionType.SelectSorting,
  payload: currentSortingType,
} as const);

export const loadOffers = (offers: OfferType[]): LoadOffersAction => ({
  type: ActionType.LoadOffers,
  payload: offers,
} as const);

export const loadCurrentOffer = (currentOffer: OfferType): LoadCurrentOfferAction => ({
  type: ActionType.LoadCurrentOffer,
  payload: currentOffer,
} as const);

export const loadOfferReviews = (offerReviews: ReviewType[]): LoadOfferReviewsAction => ({
  type: ActionType.LoadOfferReviews,
  payload: offerReviews,
} as const);

export const setCurrentOfferLoadingStatus = (currentOfferLoadingStatus: LoadingStatus): SetCurrentOfferLoadingStatusAction => ({
  type: ActionType.SetCurrentOfferLoadingStatus,
  payload: currentOfferLoadingStatus,
} as const);

export const setOfferReviewsLoadingStatus = (offerReviewsLoadingStatus: LoadingStatus): SetOfferReviewsLoadingStatusAction => ({
  type: ActionType.SetOfferReviewsLoadingStatus,
  payload: offerReviewsLoadingStatus,
} as const);

export const setReviewLoadingStatus = (reviewLoadingStatus: LoadingStatus): SetReviewLoadingStatusAction => ({
  type: ActionType.SetReviewLoadingStatus,
  payload: reviewLoadingStatus,
} as const);

export const setFavoriteOffersLoadingStatus = (favoriteOffersLoadingStatus: LoadingStatus): SetFavoriteOffersLoadingStatusAction => ({
  type: ActionType.SetFavoriteOffersLoadingStatus,
  payload: favoriteOffersLoadingStatus,
} as const);

export const setToggleIsFavoriteLoadingStatus = (toggleIsFavoriteLoadingStatus: LoadingStatus): SetToggleIsFavoriteLoadingStatusAction => ({
  type: ActionType.SetToggleIsFavoriteLoadingStatus,
  payload: toggleIsFavoriteLoadingStatus,
} as const);

export const loadNearbyOffers = (nearbyOffers: OfferType[]): LoadNearbyOffersAction => ({
  type: ActionType.LoadNearbyOffers,
  payload: nearbyOffers,
} as const);

export const loadFavoriteOffers = (favoriteOffers: OfferType[]): LoadFavoriteOffersAction => ({
  type: ActionType.LoadFavoriteOffers,
  payload: favoriteOffers,
} as const);

export const toggleIsFavorite = (favoriteOffers: OfferType[]): LoadFavoriteOffersAction => ({
  type: ActionType.LoadFavoriteOffers,
  payload: favoriteOffers,
} as const);

export const requireAuthorization = (authStatus: AuthStatus): RequireAuthorizationAction => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireLogout = (): RequireLogoutAction => ({
  type: ActionType.RequireLogout,
} as const);

export const redirectToRoute = (url: AppRoutes): RedirectToRouteAction => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);

export const receiveAuthData = (authUserData: AuthUserData): ReceiveAuthDataAction => ({
  type: ActionType.ReceiveAuthData,
  payload: authUserData,
} as const);
