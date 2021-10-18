import { ChangeEvent, Fragment, useState } from 'react';
import { RatingNames } from '../../const';
import { ratingValues } from '../../utils';

type ReviewElementsType = {
  offerRate: number,
  offerReview: string,
}

type RatingPropsType = {
  onRatingChange: (e: ChangeEvent<HTMLInputElement>) => void,
  offerRate: number,
}

function RatingStarsComponent({onRatingChange, offerRate}: RatingPropsType): JSX.Element {
  return (
    <>
      {ratingValues.map((rate) => (
        <Fragment key={rate}>
          <input className="form__rating-input visually-hidden" name="rating" value={rate} id={`${rate}-star${(rate > 1) ? 's' : ''}`} type="radio" checked={rate === offerRate} onChange={onRatingChange} />
          <label htmlFor={`${rate}-star${(rate > 1) ? 's' : ''}`} className="reviews__rating-label form__rating-label" title={RatingNames[rate-1]}>
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </Fragment>
      ))}
    </>
  );
}

function ReviewsFormComponent(): JSX.Element {
  const [userReview, setUserReview] = useState<ReviewElementsType>({
    offerRate: 0,
    offerReview: '',
  });

  const {offerRate, offerReview} = userReview;
  // eslint-disable-next-line no-console
  // console.log(offerRate);
  // eslint-disable-next-line no-console
  // console.log(offerReview);

  const ratingChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setUserReview({
      ...userReview,
      offerRate: +(e.target.value),
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
        <RatingStarsComponent onRatingChange={ratingChangeHandler} offerRate={offerRate} />
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={offerReview} onChange={reviewChangeHandler}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!((offerRate > 0) && (offerReview.length >= 50))}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewsFormComponent;
