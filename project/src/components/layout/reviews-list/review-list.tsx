import { ReviewType } from '../../../types/review-type';
import ReviewsItem from './reviews-item';

type ReviewsListPropsType = {
  reviews: ReviewType[],
}

function ReviewsList({reviews}: ReviewsListPropsType): JSX.Element {
  // eslint-disable-next-line no-console
  console.log(reviews);
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {
          reviews.map((review) => <ReviewsItem key={`${review.id}-${review.user.name}`} review={review}/>)
        }
      </ul>
    </>
  );
}

export default ReviewsList;
