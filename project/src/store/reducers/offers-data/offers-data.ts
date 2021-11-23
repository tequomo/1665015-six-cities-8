import { OffersData } from '../../../types/state';
import { LoadingStatus } from '../../../const';
import { createReducer } from '@reduxjs/toolkit';
import { loadOffers, setOffersLoadingStatus, updateOffer } from '../../action';
import { updateOffers } from '../../../utils/utils';


const initialState: OffersData = {
  offers: [],
  offersLoadingStatus: LoadingStatus.Idle,
};

const offersData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.offersLoadingStatus = action.payload;
    })
    .addCase(updateOffer, (state, action) => {
      state.offers = updateOffers(state.offers, action.payload);
    });
});

export { offersData };
