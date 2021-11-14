import { useParams } from 'react-router-dom';
import { useEffect} from 'react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { fetchOfferReviewsAction, postOfferReviewAction } from '../../../services/api-actions';
import { ThunkAppDispatch } from '../../../types/action';
import RatingStars from '../rating-stars/rating-stars';
import { State } from '../../../types/state';
import { LoadingStatus } from '../../../const';

type ReviewElementsType = {
  comment: string,
  rating: number,
}

const MIN_REVIEW_LENGTH = 50;

const mapStateToProps = ({reviewLoadingStatus}: State) => ({
  reviewLoadingStatus,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  postOfferReview(id: string, userReview: ReviewElementsType): void {
    dispatch(postOfferReviewAction(id, userReview));
    dispatch(fetchOfferReviewsAction(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;


function ReviewsForm({postOfferReview, reviewLoadingStatus}: PropsFromRedux): JSX.Element {

  const [userReview, setUserReview] = useState<ReviewElementsType>({
    comment: '',
    rating: 0,
  });

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (reviewLoadingStatus === LoadingStatus.Succeeded) {
      setUserReview({
        ...userReview,
        comment: '',
        rating: 0,
      });
    }
  }, [reviewLoadingStatus, userReview]);


  const {comment, rating} = userReview;

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setUserReview(() => ({
      ...userReview,
      rating: +(e.target.value),
    }));
    // eslint-disable-next-line no-console
    console.log(userReview);
    // eslint-disable-next-line no-console
    console.log(e.target.value);
  };

  const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setUserReview(() => ({
      ...userReview,
      comment: e.target.value,
    }));
    // eslint-disable-next-line no-console
    console.log(userReview);
    // eslint-disable-next-line no-console
    console.log(e.target.value);
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
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={comment} onChange={handleReviewChange}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!((rating > 0) && (comment.length >= MIN_REVIEW_LENGTH))}>Submit</button>
      </div>
    </form>
  );
}

export { ReviewsForm };
export default connector(ReviewsForm);
