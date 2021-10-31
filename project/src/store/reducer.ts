import { AuthStatus, DEFAULT_CITY, SortingTypes } from '../const';
// import { offers } from '../mock/offers';
import { Actions, ActionType } from '../types/action';
import { State } from '../types/state';


const initialState: State = {
  selectedCity: DEFAULT_CITY,
  offers: [],
  currentSortingType: SortingTypes.DEFAULT,
  authStatus: AuthStatus.Unknown,
  isDataLoaded: false,
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
      return {...state, offers: action.payload};
    case ActionType.RequireAuthorization:
      return {
        ...state,
        authStatus: action.payload,
        isDataLoaded: true,
      };
    case ActionType.RequireLogout:
      return {...state, authStatus: AuthStatus.NoAuth};
    default:
      return state;
  }

};

export { reducer };
