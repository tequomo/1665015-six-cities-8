import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewsItem from './reviews-item';
import { useDispatch, useSelector } from 'react-redux';
import { getSortedOfferReviews } from '../../../store/reducers/reviews-data/selectors';
import { fetchOfferReviewsAction } from '../../../services/api-actions';


type ParamsPropsType = {
  id: string,
}

function ReviewsList(): JSX.Element {

  const paramsProps = useParams<ParamsPropsType>();

  const reviews = useSelector(getSortedOfferReviews);

  const dispatch = useDispatch();

  const fetchOfferReviews = useCallback((id: string) => {
    dispatch(fetchOfferReviewsAction(paramsProps.id));
  }, [dispatch, paramsProps.id]);

  useEffect(() => {
    fetchOfferReviews(paramsProps.id);
  }, [fetchOfferReviews, paramsProps.id]);

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {
          reviews
            .map((review) => <ReviewsItem key={`${review.id}-${review.user.name}`} review={review}/>)
        }
      </ul>
    </>
  );
}

export default ReviewsList;
