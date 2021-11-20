import { DEFAULT_CITY, SortingTypes } from '../../../const';
import { Actions, ActionType } from '../../../types/action';
import { AppState } from '../../../types/state';


const initialState: AppState = {
  selectedCity: DEFAULT_CITY,
  currentSortingType: SortingTypes.DEFAULT,
};

const appState = (state: AppState = initialState, action: Actions): AppState => {
  switch (action.type) {
    case ActionType.SelectCity:
      return {
        ...state,
        selectedCity: action.payload,
      };
    // case ActionType.FilterOffers:
    //   return {
    //     ...state,
    //     // offers: action.payload,
    //   };
    case ActionType.SelectSorting:
      return {
        ...state,
        currentSortingType: action.payload,
      };
    default:
      return state;
  }

};

export { appState };
