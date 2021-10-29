import { DEFAULT_CITY, SortingTypes } from '../const';
import { offers } from '../mock/offers';
import { Actions, ActionType } from '../types/action';
import { State } from '../types/state';


const initialState: State = {
  selectedCity: DEFAULT_CITY,
  offers: offers,
  currentSortingType: SortingTypes.DEFAULT,
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
    default:
      return state;
  }

};

export { reducer };
