import { LoadingStatus } from '../../../const';
import { Actions, ActionType } from '../../../types/action';
import { NearbyData } from '../../../types/state';


const initialState: NearbyData = {
  nearbyOffers: [],
  nearbyOffersLoadingStatus: LoadingStatus.Idle,
};

const nearbyData = (state: NearbyData = initialState, action: Actions): NearbyData => {
  switch (action.type) {
    case ActionType.LoadNearbyOffers:
      return {
        ...state,
        nearbyOffers: action.payload,
        nearbyOffersLoadingStatus: LoadingStatus.Succeeded,
      };
    default:
      return state;
  }

};

export { nearbyData };
