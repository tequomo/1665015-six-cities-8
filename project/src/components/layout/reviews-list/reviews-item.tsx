import { ReviewType } from '../../../types/review-type';
import { getRatingWidth, formatReviewDate } from '../../../utils/utils';

type ReviewsItemPropsType = {
  review: ReviewType,
}

function ReviewsItem({review}: ReviewsItemPropsType): JSX.Element {
  const {comment, rating, date, user: {name, avatarUrl}} = review;
  const [dashedDate, shownDate] = formatReviewDate(date);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${getRatingWidth(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={dashedDate}>{shownDate}</time>
      </div>
    </li>
  );
}

export default ReviewsItem;
