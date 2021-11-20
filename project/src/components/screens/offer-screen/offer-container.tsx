import { useParams, useHistory } from 'react-router-dom';
import { MouseEvent, useEffect, useState } from 'react';
import { getCityData, getRatingWidth, getRandomItems } from '../../../utils';
import Map from '../../layout/map/map';
import OffersList from '../../layout/offers-list/offers-list';
import ReviewsForm from '../../layout/reviews-form/reviews-form';
import ReviewsList from '../../layout/reviews-list/review-list';
import { OfferType } from '../../../types/offer-type';
import { CustomClasses, AuthStatus, LoadingStatus, AppRoutes } from '../../../const';
import GoodsList from './goods-list';
import { State } from '../../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkAppDispatch } from '../../../types/action';
import { fetchCurrentOfferAction, fetchNearbyOffersAction, fetchOfferReviewsAction, toggleIsFavoriteAction } from '../../../services/api-actions';
import LoaderWrapper from '../../layout/loader-wrapper/loader-wrapper';
import InteriorGallery from './interior-gallery';
import { getAuthStatus } from '../../../store/reducers/user-auth/selectors';
import { getIsNearbyLoaded, getNearbyOffers } from '../../../store/reducers/nearby-data/selectors';
import { getIsCurrentOfferLoaded } from '../../../store/reducers/current-offer-data/selectors';
import { getOfferReviews, getOfferReviewsLoadingStatus } from '../../../store/reducers/reviews-data/selectors';

const MAX_IMAGES_COUNT = 6;

type ParamsPropsType = {
  id: string,
}

type OfferContainerPropsType = {
  currentOffer: OfferType,
}

const mapStateToProps = (state: State) => ({
  authStatus: getAuthStatus(state),
  nearbyOffers: getNearbyOffers(state),
  isCurrentOfferLoaded: getIsCurrentOfferLoaded(state),
  isNearbyLoaded: getIsNearbyLoaded(state),
  offerReviews: getOfferReviews(state),
  offerReviewsLoadingStatus: getOfferReviewsLoadingStatus(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchNearbyOffers(id: string) {
    dispatch(fetchNearbyOffersAction(id));
  },
  fetchOfferReviews(id: string) {
    dispatch(fetchOfferReviewsAction(id));
  },
  toggleIsFavorite(id: number, favoriteStatus: number) {
    dispatch(toggleIsFavoriteAction(id, favoriteStatus));
    dispatch(fetchCurrentOfferAction(id.toString()));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & OfferContainerPropsType;

function OfferContainer({authStatus, currentOffer, nearbyOffers, offerReviews, isNearbyLoaded, offerReviewsLoadingStatus, fetchOfferReviews, fetchNearbyOffers, toggleIsFavorite}: ConnectedComponentProps): JSX.Element {

  const history = useHistory();
  const paramsProps = useParams<ParamsPropsType>();

  useEffect(() => {
    fetchNearbyOffers(paramsProps.id);
    fetchOfferReviews(paramsProps.id);
  }, [fetchNearbyOffers, fetchOfferReviews, paramsProps.id]);

  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);

  const getActiveOfferId = (id: number | null) => {
    setSelectedOfferId(id);
  };

  const isAuth = authStatus === AuthStatus.Auth;
  const {images, description, isPremium, isFavorite, title, rating, type, bedrooms, maxAdults, price, goods, host:{avatarUrl, isPro, name}} = currentOffer;

  const galleryItems = getRandomItems(images, MAX_IMAGES_COUNT);

  const handleFavoriteButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (!isAuth) {
      history.push(AppRoutes.SignIn);
      return;
    }
    const favoriteStatus = +(!isFavorite);
    // eslint-disable-next-line no-console
    console.log(favoriteStatus);
    toggleIsFavorite(+paramsProps.id, favoriteStatus);
  };

  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <InteriorGallery galleryItems={galleryItems}/>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {isPremium &&
        <div className="property__mark">
          <span>Premium</span>
        </div>}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {title}
              </h1>
              <button className={`property__bookmark-button ${currentOffer?.isFavorite ? CustomClasses.CurrentOffer.buttonFavoriteClassName : ''} button`} type="button" onClick={handleFavoriteButtonClick}>
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">{`${isFavorite ? 'In ' : 'To '}bookmarks`}</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: `${getRatingWidth(rating)}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
          Max {maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            {<GoodsList goods={goods} />}
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className={`property__avatar-wrapper ${isPro ? CustomClasses.CurrentOffer.divProClassName : ''} user__avatar-wrapper`}>
                  <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="property__user-name">
                  {name}
                </span>
                {isPro &&
            <span className="property__user-status">
            Pro
            </span>}
              </div>
              <div className="property__description">
                <p className="property__text">
                  {description}
                </p>
              </div>
            </div>
            <section className="property__reviews reviews">
              <LoaderWrapper isLoad={offerReviewsLoadingStatus === LoadingStatus.Succeeded}>
                <ReviewsList reviews={offerReviews}/>
              </LoaderWrapper>
              {
                isAuth && <ReviewsForm />
              }
            </section>
          </div>
        </div>
        <section className="property__map map">
          <LoaderWrapper isLoad={isNearbyLoaded} >
            <Map city={getCityData(nearbyOffers)} offers={nearbyOffers} selectedOfferId={selectedOfferId} currentOffer={currentOffer}/>
          </LoaderWrapper>
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <LoaderWrapper isLoad={isNearbyLoaded} >
            <OffersList offers={nearbyOffers} transferActiveOfferId={getActiveOfferId} customClasses={CustomClasses.NearPlaces} isLoad={isNearbyLoaded}/>
          </LoaderWrapper>
        </section>
      </div>
    </main>
  );
}

export { OfferContainer };
export default connector(OfferContainer);
