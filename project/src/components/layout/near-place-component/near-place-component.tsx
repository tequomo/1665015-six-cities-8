import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { OfferType } from '../../../types/offer-type';
import { capitalizeWord, getRatingWidth } from '../../../utils';

type NearPlacePropsType = {
  nearPlace: OfferType,
}

function NearPlaceComponent({nearPlace}: NearPlacePropsType): JSX.Element {
  const {isFavorite, price, type, title, rating, previewImage, id} = nearPlace;
  return (
    <article className="near-places__card place-card">
      <div className="near-places__image-wrapper place-card__image-wrapper">
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
            <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
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

export default NearPlaceComponent;
