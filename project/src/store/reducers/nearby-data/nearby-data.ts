import { createReducer } from '@reduxjs/toolkit';
import { LoadingStatus } from '../../../const';
import { NearbyData } from '../../../types/state';
import { updateOffers } from '../../../utils/utils';
import { loadNearbyOffers, setNearbyOffersLoadingStatus, updateOffer } from '../../action';


const initialState: NearbyData = {
  nearbyOffers: [],
  nearbyOffersLoadingStatus: LoadingStatus.Idle,
};

const nearbyData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setNearbyOffersLoadingStatus, (state, action) => {
      state.nearbyOffersLoadingStatus = action.payload;
    })
    .addCase(updateOffer, (state, action) => {
      state.nearbyOffers = updateOffers(state.nearbyOffers, action.payload);
    });
});

export { nearbyData };
