import { offers } from '../mock/offers';
import { Actions, ActionType } from '../types/action';
import { State } from '../types/state';
import { getSelectedCityOffers } from '../utils';

const DEFAULT_CITY = 'Amsterdam';

const initialState: State = {
  currentCity: DEFAULT_CITY,
  offers: getSelectedCityOffers(offers, DEFAULT_CITY),
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SelectCity:
      return {...state, currentCity: action.payload};
    case ActionType.LoadOffers:
      return {...state, offers: action.payload};
    default:
      return state;
  }

};

export { reducer };
