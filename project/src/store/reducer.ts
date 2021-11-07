import { AuthStatus, DEFAULT_CITY, SortingTypes } from '../const';
// import { offers } from '../mock/offers';
import { Actions, ActionType } from '../types/action';
import { State } from '../types/state';


const initialState: State = {
  selectedCity: DEFAULT_CITY,
  offers: [],
  currentOffer: null,
  nearbyOffers: [],
  currentSortingType: SortingTypes.DEFAULT,
  authStatus: AuthStatus.Unknown,
  isDataLoaded: false,
  isCurrentOfferLoaded: false,
  isNearbyLoaded: false,
  authUserData: null,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SelectCity:
      return {...state, selectedCity: action.payload};
    case ActionType.FilterOffers:
      return {...state, offers: action.payload};
    case ActionType.ResetState:
      return {...initialState};
    case ActionType.SelectSorting:
      return {...state, currentSortingType: action.payload};
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
    case ActionType.LoadNearbyOffers:
      return {...state,
        nearbyOffers: action.payload,
        isNearbyLoaded: true,
      };
    case ActionType.RequireAuthorization:
      return {
        ...state,
        authStatus: action.payload,
      };
    case ActionType.RequireLogout:
      return {...state,
        authStatus: AuthStatus.NoAuth,
      };
    case ActionType.ReceiveAuthData:
      return {...state,
        authUserData: action.payload,
      };
    default:
      return state;
  }

};

export { reducer };
