import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoutes, AuthStatus } from '../../../const';
import { toggleIsFavoriteAction } from '../../../services/api-actions';
import { redirectToRoute } from '../../../store/action';
import { getAuthStatus } from '../../../store/reducers/user-auth/selectors';
import { PlacesClassType } from '../../../types/classes-type';
import { OfferType } from '../../../types/offer-type';
import { capitalizeWord, getRatingWidth } from '../../../utils';
import FavoriteButton from './favorite-button';
import PlaceCardMark from './place-card-mark';

type CardPropsType = {
  offer: OfferType,
  onCardOver: (id: number) => void,
  onCardOut: () => void,
  customClasses: PlacesClassType,
}

function PlaceCard({offer, onCardOver, onCardOut, customClasses}: CardPropsType): JSX.Element {
  const { isPremium, isFavorite, price, type, title, rating, previewImage, id } = offer;
  const {cardClassName, wrapperClassName} = customClasses;

  const authStatus = useSelector(getAuthStatus);

  const dispatch = useDispatch();

  const toggleIsFavorite = (offerId: number, favoriteStatus: number): void => {
    dispatch(toggleIsFavoriteAction(offerId, favoriteStatus));
  };

  const isAuth = authStatus === AuthStatus.Auth;

  const handleFavoriteButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (!isAuth) {
      dispatch(redirectToRoute(AppRoutes.SignIn));
      return;
    }
    const favoriteStatus = +(!isFavorite);
    toggleIsFavorite(id, favoriteStatus);
  };

  return (
    <article className={`${cardClassName} place-card`} onMouseEnter={() => onCardOver(id)} onMouseLeave={() => onCardOut()}>
      {isPremium && <PlaceCardMark />}
      <div className={`${wrapperClassName} place-card__image-wrapper`}>
        <Link to={`${AppRoutes.Offer}${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Great Housing!" />
        </Link>
      </div>
      <div className="place-card__info">
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
