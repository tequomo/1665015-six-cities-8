import { OffersData } from '../../../types/state';
import { Actions, ActionType } from '../../../types/action';
import { LoadingStatus } from '../../../const';


const initialState: OffersData = {
  offers: [],
  offersLoadingStatus: LoadingStatus.Idle,
};

const offersData = (state: OffersData = initialState, action: Actions): OffersData => {
  switch (action.type) {
    case ActionType.LoadOffers:
      return {
        ...state,
        offers: action.payload,
        offersLoadingStatus: LoadingStatus.Succeeded,
      };
    default:
      return state;
  }
};

export { offersData };
