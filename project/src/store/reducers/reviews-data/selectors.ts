import { LoadingStatus } from '../../../const';
import { ReviewType } from '../../../types/review-type';
import { State } from '../../../types/state';
import { NameSpace } from '../root-reducer';


export const getOfferReviews = (state: State): ReviewType[] => state[NameSpace.reviews].offerReviews;
export const getOfferReviewsLoadingStatus = (state: State): LoadingStatus => state[NameSpace.reviews].offerReviewsLoadingStatus;
export const getReviewLoadingStatus = (state: State): LoadingStatus => state[NameSpace.reviews].reviewLoadingStatus;
