import { ReviewsData } from '../../../types/state';
import { LoadingStatus } from '../../../const';
import { createReducer } from '@reduxjs/toolkit';
import { loadOfferReviews, setOfferReviewsLoadingStatus, setReviewLoadingStatus } from '../../action';


const initialState: ReviewsData = {
  offerReviews: [],
  offerReviewsLoadingStatus: LoadingStatus.Idle,
  reviewLoadingStatus: LoadingStatus.Idle,
};

const reviewsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOfferReviews, (state, action) => {
      state.offerReviews = action.payload;
    })
    .addCase(setOfferReviewsLoadingStatus, (state, action) => {
      state.offerReviewsLoadingStatus = action.payload;
    })
    .addCase(setReviewLoadingStatus, (state, action) => {
      state.reviewLoadingStatus = action.payload;
    });
});

//  action: Actions): ReviewsData => {
//   switch (action.type) {
//     case ActionType.LoadOfferReviews:
//       return {
//         ...state,
//         offerReviews: action.payload,
//         offerReviewsLoadingStatus: LoadingStatus.Succeeded,
//       };
//     case ActionType.SetOfferReviewsLoadingStatus:
//       return {
//         ...state,
//         offerReviewsLoadingStatus: action.payload,
//       };
//     case ActionType.SetReviewLoadingStatus:
//       return {
//         ...state,
//         reviewLoadingStatus: action.payload,
//       };
//     default:
//       return state;
//   }

// };

export { reviewsData };
