import { OffersData } from '../../../types/state';
import { LoadingStatus } from '../../../const';
import { createReducer } from '@reduxjs/toolkit';
import { loadOffers, setOffersLoadingStatus } from '../../action';


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
    });
});

// ) (state: OffersData = initialState, action: Actions): OffersData => {
//   switch (action.type) {
//     case ActionType.LoadOffers:
//       return {
//         ...state,
//         offers: action.payload,
//         offersLoadingStatus: LoadingStatus.Succeeded,
//       };
//     default:
//       return state;
//   }
// };

export { offersData };
