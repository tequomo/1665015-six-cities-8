import { ChangeEvent, Fragment } from 'react';
import { RatingNames } from '../../../const';
import { ratingValues } from '../../../utils';

type RatingPropsType = {
  onRatingChange: (e: ChangeEvent<HTMLInputElement>) => void,
  offerRank: number,
}

function RatingStarsComponent({onRatingChange, offerRank}: RatingPropsType): JSX.Element {
  return (
    <>
      {ratingValues.map((rank) => (
        <Fragment key={rank}>
          <input className="form__rating-input visually-hidden" name="rating" value={rank} id={`${rank}-star${(rank > 1) ? 's' : ''}`} type="radio" checked={rank === offerRank} onChange={onRatingChange} />
          <label htmlFor={`${rank}-star${(rank > 1) ? 's' : ''}`} className="reviews__rating-label form__rating-label" title={RatingNames[rank-1]}>
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </Fragment>
      ))}
    </>
  );
}

export default RatingStarsComponent;
