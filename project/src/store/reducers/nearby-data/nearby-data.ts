import { Actions, ActionType } from '../../../types/action';
import { NearbyData } from '../../../types/state';


const initialState: NearbyData = {
  nearbyOffers: [],
  isNearbyLoaded: false,
};

const nearbyData = (state: NearbyData = initialState, action: Actions): NearbyData => {
  switch (action.type) {
    case ActionType.LoadNearbyOffers:
      return {
        ...state,
        nearbyOffers: action.payload,
        isNearbyLoaded: true,
      };
    default:
      return state;
  }

};

export { nearbyData };
