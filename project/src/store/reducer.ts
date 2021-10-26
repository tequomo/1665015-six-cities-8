import { offers } from '../mock/offers';
import { Actions, ActionType } from '../types/action';
import { State } from '../types/state';
import { getSelectedCityOffers } from '../utils';

const DEFAULT_CITY = 'Amsterdam';

const initialState: State = {
  selectedCity: DEFAULT_CITY,
  offers: getSelectedCityOffers(offers, DEFAULT_CITY),
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SelectCity:
      return {...state, selectedCity: action.payload};
    case ActionType.FilterOffers:
      // return {...state, offers: action.payload};
      return {...state, offers: getSelectedCityOffers(offers, state.selectedCity)};
    case ActionType.ResetState:
      return {...initialState};
    default:
      return state;
  }

};

export { reducer };
