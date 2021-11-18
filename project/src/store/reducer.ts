import { AuthStatus, DEFAULT_CITY, LoadingStatus, SortingTypes } from '../const';
// import { offers } from '../mock/offers';
import { Actions, ActionType } from '../types/action';
import { State } from '../types/state';


const initialState: State = {
  selectedCity: DEFAULT_CITY,
  offers: [],
  currentOffer: null,
  offerReviews: [],
  nearbyOffers: [],
  favoriteOffers: [],
  currentSortingType: SortingTypes.DEFAULT,
  authStatus: AuthStatus.Unknown,
  isDataLoaded: false,
  isCurrentOfferLoaded: false,
  isNearbyLoaded: false,
  authUserData: null,
  currentOfferLoadingStatus: LoadingStatus.Idle,
  offerReviewsLoadingStatus: LoadingStatus.Idle,
  favoriteOffersLoadingStatus: LoadingStatus.Idle,
  reviewLoadingStatus: LoadingStatus.Idle,
  toggleIsFavoriteLoadingStatus: LoadingStatus.Idle,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SelectCity:
      return {
        ...state,
        selectedCity: action.payload,
      };
    case ActionType.FilterOffers:
      return {
        ...state, offers: action.payload,
      };
    case ActionType.ResetState:
      return {
        ...initialState,
      };
    case ActionType.SelectSorting:
      return {
        ...state,
        currentSortingType: action.payload,
      };
    case ActionType.LoadOffers:
      return {
        ...state,
        offers: action.payload,
        isDataLoaded: true,
      };
    case ActionType.LoadCurrentOffer:
      return {
        ...state,
        currentOffer: action.payload,
        isCurrentOfferLoaded: true,
      };
    case ActionType.LoadOfferReviews:
      return {
        ...state,
        offerReviews: action.payload,
        offerReviewsLoadingStatus: LoadingStatus.Succeeded,
      };
    case ActionType.LoadNearbyOffers:
      return {
        ...state,
        nearbyOffers: action.payload,
        isNearbyLoaded: true,
      };
    case ActionType.LoadFavoriteOffers:
      return {
        ...state,
        favoriteOffers: action.payload,
        favoriteOffersLoadingStatus: LoadingStatus.Succeeded,
      };
    case ActionType.ToggleIsFavorite:
      return {
        ...state,
        currentOffer: action.payload,
      };
    case ActionType.RequireAuthorization:
      return {
        ...state,
        authStatus: action.payload,
      };
    case ActionType.RequireLogout:
      return {
        ...state,
        authStatus: AuthStatus.NoAuth,
      };
    case ActionType.ReceiveAuthData:
      return {
        ...state,
        authUserData: action.payload,
      };
    case ActionType.SetCurrentOfferLoadingStatus:
      return {
        ...state,
        currentOfferLoadingStatus: action.payload,
      };
    case ActionType.SetOfferReviewsLoadingStatus:
      return {
        ...state,
        offerReviewsLoadingStatus: action.payload,
      };
    case ActionType.SetReviewLoadingStatus:
      return {
        ...state,
        reviewLoadingStatus: action.payload,
      };
    case ActionType.SetToggleIsFavoriteLoadingStatus:
      return {
        ...state,
        toggleIsFavoriteLoadingStatus: action.payload,
      };
    default:
      return state;
  }

};

export { reducer };
