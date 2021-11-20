import { CurrentOfferData } from '../../../types/state';
import { LoadingStatus } from '../../../const';
import { Actions, ActionType } from '../../../types/action';


const initialState: CurrentOfferData = {
  currentOffer: null,
  currentOfferLoadingStatus: LoadingStatus.Idle,
};

const currentOfferData = (state: CurrentOfferData = initialState, action: Actions): CurrentOfferData => {
  switch (action.type) {
    case ActionType.LoadCurrentOffer:
      return {
        ...state,
        currentOffer: action.payload,
        currentOfferLoadingStatus: LoadingStatus.Succeeded,
      };
    case ActionType.SetCurrentOfferLoadingStatus:
      return {
        ...state,
        currentOfferLoadingStatus: action.payload,
      };
    default:
      return state;
  }

};

export { currentOfferData };
