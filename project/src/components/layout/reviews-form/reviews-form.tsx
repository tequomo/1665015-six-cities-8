import { useParams } from 'react-router-dom';
import { useEffect} from 'react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOfferReviewsAction, postOfferReviewAction } from '../../../services/api-actions';
import RatingStars from '../rating-stars/rating-stars';
import { LoadingStatus, ReviewLength } from '../../../const';
import { getReviewLoadingStatus } from '../../../store/reducers/reviews-data/selectors';
import { checkIsValidUserReview } from '../../../utils/utils';

type ReviewElementsType = {
  comment: string,
  rating: number,
}

const initReviewState = {
  comment: '',
  rating: 0,
};

function ReviewsForm(): JSX.Element {

  const reviewLoadingStatus = useSelector(getReviewLoadingStatus);
  const isReviewLoading = reviewLoadingStatus === LoadingStatus.Loading;

  const dispatch = useDispatch();

  const postOfferReview = (id: string, userReview: ReviewElementsType): void => {
    dispatch(postOfferReviewAction(id, userReview));
    dispatch(fetchOfferReviewsAction(id));
  };

  const [userReview, setUserReview] = useState<ReviewElementsType>(initReviewState);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (reviewLoadingStatus === LoadingStatus.Succeeded) {
      setUserReview(initReviewState);
    }
  }, [reviewLoadingStatus]);


  const {comment, rating} = userReview;

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserReview((state) => ({
      ...state,
      rating: +(e.target.value),
    }));
  };

  const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setUserReview((state) => ({
      ...state,
      comment: e.target.value,
    }));
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    postOfferReview(id, userReview);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <RatingStars onRatingChange={handleRatingChange} rating={rating} />
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={comment} onChange={handleReviewChange} disabled={isReviewLoading}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with
          {
            comment.length < ReviewLength.Min ? ' at least ': ' up to '
          }
          <b className="reviews__text-amount">
            {
              comment.length < ReviewLength.Min ? ' 50 ' : ' 300 '
            } characters
          </b>.
          {
            ((comment.length < ReviewLength.Min ) && (comment.length > (ReviewLength.Min - 10))) && `${ReviewLength.Min - comment.length} characters are missing.`
          }
          { (comment.length >= ReviewLength.Max ) && `${comment.length - (ReviewLength.Max - 1) } characters are redundant.`}
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={checkIsValidUserReview(rating, comment) || isReviewLoading}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewsForm;
