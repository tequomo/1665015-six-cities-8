import { useParams } from 'react-router';
import { offers } from '../../../mock/offers';
import { reviews } from '../../../mock/reviews';
// import { ReviewType } from '../../../types/review-type';
import { getRatingWidth } from '../../../utils';
import HeaderComponent from '../../layout/header-component/header-component';
import NearPlacesListComponent from '../../layout/near-places-list-component/near-places-list-component';
import ReviewsFormComponent from '../../layout/reviews-form-component/reviews-form-component';
import ReviewsListComponent from '../../layout/reviews-list-component/review-list-component';

type ParamsPropsType = {
  id: string,
}

// type LocationPropsType = {
//   reviews: ReviewType[],
// }

type GoodsType = {
  goods: string[],
}

function GoodsList({goods}: GoodsType): JSX.Element {
  return (
    <div className="property__inside">
      <h2 className="property__inside-title">What&apos;s inside</h2>
      <ul className="property__inside-list">
        {goods.map((good) => (
          <li key={`${good}-1`} className="property__inside-item">
            {good}
          </li>))}
      </ul>
    </div>
  );
}

function OfferScreen(): JSX.Element {
  const offerParams = useParams<ParamsPropsType>();
  const offerReviews = reviews.filter((review) => review.id === +offerParams.id);
  const [{isPremium, isFavorite, title, rating, type, bedrooms, maxAdults, price, goods, host:{avatarUrl, isPro, name}}] = offers.filter((offer) => offer.id === +offerParams.id);
  return (
    <div className="page">
      <HeaderComponent renderAuth />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              <div className="property__image-wrapper">
                <img className="property__image" src="img/room.jpg" alt="Great Housing!" />
              </div>
              <div className="property__image-wrapper">
                <img className="property__image" src="img/apartment-01.jpg" alt="Great Housing!" />
              </div>
              <div className="property__image-wrapper">
                <img className="property__image" src="img/apartment-02.jpg" alt="Great Housing!" />
              </div>
              <div className="property__image-wrapper">
                <img className="property__image" src="img/apartment-03.jpg" alt="Great Housing!" />
              </div>
              <div className="property__image-wrapper">
                <img className="property__image" src="img/studio-01.jpg" alt="Great Housing!" />
              </div>
              <div className="property__image-wrapper">
                <img className="property__image" src="img/apartment-01.jpg" alt="Great Housing!" />
              </div>
            </div>
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
                <button className={`property__bookmark-button ${isFavorite ? 'property__bookmark-button--active' : ''} button`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">${isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
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
                  <div className={`property__avatar-wrapper ${isPro ? 'property__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
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
                  A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                  </p>
                  <p className="property__text">
                  An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <ReviewsListComponent reviews={offerReviews}/>
                <ReviewsFormComponent />
              </section>
            </div>
          </div>
          <section className="property__map map"></section>
        </section>
        <div className="container">
          <NearPlacesListComponent nearPlaces={offers.filter((offer) => offer.id !== +offerParams.id)}/>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
