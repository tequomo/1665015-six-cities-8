import { ChangeEvent, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { LoadingStatus, RatingNames } from '../../../const';
import { getReviewLoadingStatus } from '../../../store/reducers/reviews-data/selectors';
import { ratingValues } from '../../../utils';

type RatingPropsType = {
  onRatingChange: (e: ChangeEvent<HTMLInputElement>) => void,
  rating: number,
}


function RatingStars({onRatingChange, rating}: RatingPropsType): JSX.Element {

  const reviewLoadingStatus = useSelector(getReviewLoadingStatus);

  return (
    <>
      {ratingValues.map((rank) => (
        <Fragment key={rank}>
          <input className="form__rating-input visually-hidden" name="rating" value={rank} id={`rating-${rank}-star`} type="radio" checked={rank === rating} onChange={onRatingChange} disabled={reviewLoadingStatus === LoadingStatus.Loading}/>
          <label htmlFor={`rating-${rank}-star`} className="reviews__rating-label form__rating-label" title={RatingNames[rank-1]}>
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </Fragment>
      ))}
    </>
  );
}

export default RatingStars;
