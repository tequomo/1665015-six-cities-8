import { ReviewsData } from '../../../types/state';
import { LoadingStatus } from '../../../const';
import { Actions, ActionType } from '../../../types/action';


const initialState: ReviewsData = {
  offerReviews: [],
  offerReviewsLoadingStatus: LoadingStatus.Idle,
  reviewLoadingStatus: LoadingStatus.Idle,
};

const reviewsData = (state: ReviewsData = initialState, action: Actions): ReviewsData => {
  switch (action.type) {
    case ActionType.LoadOfferReviews:
      return {
        ...state,
        offerReviews: action.payload,
        offerReviewsLoadingStatus: LoadingStatus.Succeeded,
      };
    case ActionType.SetOfferReviewsLoadingStatus:
      return {
        ...state,
        offerReviewsLoadingStatus: action.payload,
      };
    case ActionType.SetReviewLoadingStatus:
      return {
        ...state,
        reviewLoadingStatus: action.payload,
      };
    default:
      return state;
  }

};

export { reviewsData };
