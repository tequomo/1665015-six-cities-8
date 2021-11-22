import { MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoutes, AuthStatus } from '../../../const';
import { toggleIsFavoriteAction } from '../../../services/api-actions';
import { redirectToRoute } from '../../../store/action';
import { getAuthStatus } from '../../../store/reducers/user-auth/selectors';
import { OfferType } from '../../../types/offer-type';
import { capitalizeWord, getRatingWidth } from '../../../utils';

type FavoriteCardPropsType = {
  favoriteOffer: OfferType,
}

function FavoritesCard({favoriteOffer}: FavoriteCardPropsType): JSX.Element {
  const { price, type, title, rating, previewImage, id, isFavorite } = favoriteOffer;

  const authStatus = useSelector(getAuthStatus);

  const isAuth = authStatus === AuthStatus.Auth;

  const dispatch = useDispatch();

  const toggleIsFavorite = (favoriteId: number, favoriteStatus: number) => {
    dispatch(toggleIsFavoriteAction(favoriteId, favoriteStatus));
  };

  const handleFavoriteButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (!isAuth) {
      dispatch(redirectToRoute(AppRoutes.SignIn));
      return;
    }
    const favoriteStatus = +(!isFavorite);
    toggleIsFavorite(id, favoriteStatus);
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
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button" onClick={handleFavoriteButtonClick}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
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

export default FavoritesCard;
