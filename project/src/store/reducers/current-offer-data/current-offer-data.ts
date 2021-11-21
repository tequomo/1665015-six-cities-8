import { CurrentOfferData } from '../../../types/state';
import { LoadingStatus } from '../../../const';
import { createReducer } from '@reduxjs/toolkit';
import { loadCurrentOffer, setCurrentOfferLoadingStatus } from '../../action';


const initialState: CurrentOfferData = {
  currentOffer: null,
  currentOfferLoadingStatus: LoadingStatus.Idle,
};


const currentOfferData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(setCurrentOfferLoadingStatus, (state, action) => {
      state.currentOfferLoadingStatus = action.payload;
    });
});

export { currentOfferData };
