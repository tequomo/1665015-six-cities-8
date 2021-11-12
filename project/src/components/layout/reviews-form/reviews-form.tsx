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
  offerReview: string,
  offerRank: number,
}

const MIN_REVIEW_LENGTH = 50;

const mapStateToProps = ({reviewLoadingStatus}: State) => ({
  reviewLoadingStatus,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  handleFormSubmit(id: string, offerReview: string, offerRank: number): void {
    const review = {comment: offerReview, rating: offerRank};
    dispatch(postOfferReviewAction(id, review));
    dispatch(fetchOfferReviewsAction(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;


function ReviewsForm({handleFormSubmit, reviewLoadingStatus}: PropsFromRedux): JSX.Element {

  const [userReview, setUserReview] = useState<ReviewElementsType>({
    offerReview: '',
    offerRank: 0,
  });

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (reviewLoadingStatus === LoadingStatus.Succeeded) {
      setUserReview({
        ...userReview,
        offerReview: '',
        offerRank: 0,
      });
    }
  }, [reviewLoadingStatus, userReview]);


  const {offerRank, offerReview} = userReview;

  const ratingChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setUserReview({
      ...userReview,
      offerReview,
      offerRank: +(e.target.value),
    });
  };

  const reviewChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setUserReview({
      ...userReview,
      offerReview: e.target.value,
      offerRank,
    });
  };

  const formSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    handleFormSubmit(id, offerReview, offerRank);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={formSubmitHandler}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <RatingStars onRatingChange={ratingChangeHandler} offerRank={offerRank} />
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={offerReview} onChange={reviewChangeHandler}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!((offerRank > 0) && (offerReview.length >= MIN_REVIEW_LENGTH))}>Submit</button>
      </div>
    </form>
  );
}

export { ReviewsForm };
export default connector(ReviewsForm);
