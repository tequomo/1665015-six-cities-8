import { CurrentOfferData } from '../../../types/state';
import { LoadingStatus } from '../../../const';
import { createReducer } from '@reduxjs/toolkit';
import { loadCurrentOffer, setCurrentOfferLoadingStatus, updateOffer } from '../../action';
import { updateCurrentOffer } from '../../../utils/utils';


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
    })
    .addCase(updateOffer, (state, action) => {
      if (state.currentOffer !== null) {
        state.currentOffer = updateCurrentOffer(state.currentOffer, action.payload);
      }
    });
});

export { currentOfferData };
