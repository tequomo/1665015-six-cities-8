import { useParams } from 'react-router';
import { useState } from 'react';
import { offers } from '../../../mock/offers';
import { reviews } from '../../../mock/reviews';
// import { ReviewType } from '../../../types/review-type';
import { getRatingWidth } from '../../../utils';
import HeaderComponent from '../../layout/header-component/header-component';
import MainMapComponent from '../../layout/main-map-component/main-map-component';
import OffersListComponent from '../../layout/offers-list-component/offers-list-component';
import ReviewsFormComponent from '../../layout/reviews-form-component/reviews-form-component';
import ReviewsListComponent from '../../layout/reviews-list-component/review-list-component';
import { OfferType } from '../../../types/offer-type';
import { CardCustomClasses } from '../../../const';
import GoodsListComponent from './goods-list-component';

type ParamsPropsType = {
  id: string,
}

function OfferScreen(): JSX.Element {
  const offerParams = useParams<ParamsPropsType>();
  const offerReviews = reviews.filter((review) => review.id === +offerParams.id);
  const [{isPremium, isFavorite, title, rating, type, bedrooms, maxAdults, price, goods, host:{avatarUrl, isPro, name}}] = offers.filter((offer) => offer.id === +offerParams.id);

  const closestOffers: OfferType[] = offers.filter((offer) => offer.id !== +offerParams.id);

  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);

  const getActiveOfferId = (id: number | null) => {
    setSelectedOfferId(id);
  };

  // eslint-disable-next-line no-console
  console.log(selectedOfferId);

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
              {<GoodsListComponent goods={goods} />}
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
          <section className="property__map map">
            <MainMapComponent city={offers[0].city} offers={closestOffers} selectedOfferId={selectedOfferId}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersListComponent offers={closestOffers} reviews={reviews} transferActiveOfferId={getActiveOfferId} customClasses={CardCustomClasses.NearPlaces}/>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
