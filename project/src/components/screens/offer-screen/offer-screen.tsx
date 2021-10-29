import { useParams } from 'react-router';
import { useState } from 'react';
import { offers } from '../../../mock/offers';
import { reviews } from '../../../mock/reviews';
import { getRatingWidth } from '../../../utils';
import Header from '../../layout/header/header';
import MainMap from '../../layout/main-map/main-map';
import OffersList from '../../layout/offers-list/offers-list';
import ReviewsForm from '../../layout/reviews-form/reviews-form';
import ReviewsList from '../../layout/reviews-list/review-list';
import { OfferType } from '../../../types/offer-type';
import { CardCustomClasses } from '../../../const';
import GoodsList from './goods-list';

type ParamsPropsType = {
  id: string,
}

function OfferScreen(): JSX.Element {
  const offerParams = useParams<ParamsPropsType>();
  const offerReviews = reviews.filter((review) => review.id === +offerParams.id);
  const [{isPremium, isFavorite, title, rating, type, bedrooms, maxAdults, price, goods, host:{avatarUrl, isPro, name}}] = offers.filter((offer) => offer.id === +offerParams.id);

  const closestOffers: OfferType[] = offers.filter((offer) => offer.id !== +offerParams.id).slice(0, 3);

  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);

  const getActiveOfferId = (id: number | null) => {
    setSelectedOfferId(id);
  };

  return (
    <div className="page">
      <Header renderAuth />

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
                <ReviewsList reviews={offerReviews}/>
                <ReviewsForm />
              </section>
            </div>
          </div>
          <section className="property__map map">
            <MainMap city={offers[0].city} offers={closestOffers} selectedOfferId={selectedOfferId}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList offers={closestOffers} reviews={reviews} transferActiveOfferId={getActiveOfferId} customClasses={CardCustomClasses.NearPlaces}/>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
