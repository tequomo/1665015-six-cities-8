import { createReducer } from '@reduxjs/toolkit';
import { LoadingStatus } from '../../../const';
import { NearbyData } from '../../../types/state';
import { loadNearbyOffers, setNearbyOffersLoadingStatus } from '../../action';


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
    });
});

export { nearbyData };
