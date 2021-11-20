import { OffersData } from '../../../types/state';
import { Actions, ActionType } from '../../../types/action';


const initialState: OffersData = {
  offers: [],
  isDataLoaded: false,
};

const offersData = (state: OffersData = initialState, action: Actions): OffersData => {
  switch (action.type) {
    case ActionType.LoadOffers:
      return {
        ...state,
        offers: action.payload,
        isDataLoaded: true,
      };
    default:
      return state;
  }
};

export { offersData };
