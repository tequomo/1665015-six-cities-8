import { offers } from '../mock/offers';
import { Actions, ActionType } from '../types/action';
import { State } from '../types/state';

const DEFAULT_CITY = 'Paris';

const initialState: State = {
  selectedCity: DEFAULT_CITY,
  offers: offers,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SelectCity:
      return {...state, selectedCity: action.payload};
    case ActionType.FilterOffers:
      return {...state, offers: action.payload};
    case ActionType.ResetState:
      return {...initialState};
    default:
      return state;
  }

};

export { reducer };
