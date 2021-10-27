import { ChangeEvent, useState } from 'react';
import RatingStars from '../rating-stars/rating-stars';

type ReviewElementsType = {
  offerRank: number,
  offerReview: string,
}


function ReviewsForm(): JSX.Element {
  const [userReview, setUserReview] = useState<ReviewElementsType>({
    offerRank: 0,
    offerReview: '',
  });

  const {offerRank, offerReview} = userReview;
  // eslint-disable-next-line no-console
  console.log(offerRank);
  // eslint-disable-next-line no-console
  console.log(offerReview);

  const ratingChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setUserReview({
      ...userReview,
      offerRank: +(e.target.value),
    });
  };

  const reviewChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setUserReview({
      ...userReview,
      offerReview: e.target.value,
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <RatingStars onRatingChange={ratingChangeHandler} offerRank={offerRank} />
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={offerReview} onChange={reviewChangeHandler}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!((offerRank > 0) && (offerReview.length >= 50))}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewsForm;
