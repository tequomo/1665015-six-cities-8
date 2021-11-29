import { ReviewsData } from '../../../types/state';
import { LoadingStatus } from '../../../const';
import { loadOfferReviews,
  setOfferReviewsLoadingStatus,
  setReviewLoadingStatus} from '../../action';
import { reviewsData } from './reviews-data';
import { getFakeReviews } from '../../../utils/mock';


const state: ReviewsData = {
  offerReviews: [],
  offerReviewsLoadingStatus: LoadingStatus.Idle,
  reviewLoadingStatus: LoadingStatus.Idle,
};

const offerReviews = getFakeReviews();

describe('Reducer: reviewsData', () => {
  it('with omit parameters should return initial state', () => {
    expect(reviewsData(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual(state);
  });
  it('should update state if reviews is loaded', () => {
    expect(reviewsData(state, loadOfferReviews(offerReviews)))
      .toEqual({
        ...state,
        offerReviews: offerReviews,
      });
  });
  it('should update loading status when reviews are loaded or not loaded', () => {
    expect(reviewsData(state, setOfferReviewsLoadingStatus(LoadingStatus.Succeeded)))
      .toEqual({
        ...state,
        offerReviewsLoadingStatus: LoadingStatus.Succeeded,
      });

    expect(reviewsData(state, setOfferReviewsLoadingStatus(LoadingStatus.Failed)))
      .toEqual({
        ...state,
        offerReviewsLoadingStatus: LoadingStatus.Failed,
      });
  });

  it('should update loading status during review uploading process', () => {
    expect(reviewsData(state, setReviewLoadingStatus(LoadingStatus.Loading)))
      .toEqual({
        ...state,
        reviewLoadingStatus: LoadingStatus.Loading,
      });

    expect(reviewsData(state, setReviewLoadingStatus(LoadingStatus.Succeeded)))
      .toEqual({
        ...state,
        reviewLoadingStatus: LoadingStatus.Succeeded,
      });

    expect(reviewsData(state, setReviewLoadingStatus(LoadingStatus.Failed)))
      .toEqual({
        ...state,
        reviewLoadingStatus: LoadingStatus.Failed,
      });
  });

});
