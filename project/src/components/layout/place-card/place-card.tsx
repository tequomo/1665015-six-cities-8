// import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../const';
import { PlacesClassType } from '../../../types/classes-type';
import { OfferType } from '../../../types/offer-type';
import { ReviewType } from '../../../types/review-type';
import { capitalizeWord, getRatingWidth } from '../../../utils';

type CardPropsType = {
  offer: OfferType,
  reviews: ReviewType[],
  onCardOver: (id: number) => void,
  onCardOut: () => void,
  customClasses: PlacesClassType,
}

function PlaceCardMark(): JSX.Element {
  return (
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
  );
}

function PlaceCard({offer, reviews, onCardOver, onCardOut, customClasses}: CardPropsType): JSX.Element {
  const { isPremium, isFavorite, price, type, title, rating, previewImage, id } = offer;
  const {cardClassName, wrapperClassName} = customClasses;
  return (
    <article className={`${cardClassName} place-card`} onMouseEnter={() => onCardOver(id)} onMouseLeave={() => onCardOut()}>
      {isPremium && <PlaceCardMark />}
      <div className={`${wrapperClassName} place-card__image-wrapper`}>
        <a href="/">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Great Housing!" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">${isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getRatingWidth(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoutes.Offer}${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{capitalizeWord(type)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
