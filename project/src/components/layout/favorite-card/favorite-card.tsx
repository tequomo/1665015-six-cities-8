import { MouseEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { toggleIsFavoriteAction } from '../../../services/api-actions';
import { OfferType } from '../../../types/offer-type';
import { capitalizeWord, getRatingWidth } from '../../../utils/utils';
import FavoriteButton from '../favorite-button/favorite-button';

type FavoriteCardPropsType = {
  favoriteOffer: OfferType,
}

function FavoriteCard({favoriteOffer}: FavoriteCardPropsType): JSX.Element {
  const { price, type, title, rating, previewImage, id, isFavorite } = favoriteOffer;

  const dispatch = useDispatch();

  const handleFavoriteButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const favoriteStatus = +(!isFavorite);
    dispatch(toggleIsFavoriteAction(id, favoriteStatus));
  };

  useEffect(() => {
    toggleIsFavoriteAction(id, +(!isFavorite));
  }, [id, isFavorite]);

  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href="/">
          <img className="place-card__image" src={previewImage} width="150" height="110" alt="Great Housing!" />
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton isFavorite={isFavorite} onFavoriteButtonClick={handleFavoriteButtonClick} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getRatingWidth(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{capitalizeWord(type)}</p>
      </div>
    </article>
  );
}

export default FavoriteCard;
