import { MouseEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../const';
import { fetchFavoriteOffersAction, toggleIsFavoriteAction } from '../../../services/api-actions';
import { ThunkAppDispatch } from '../../../types/action';
import { OfferType } from '../../../types/offer-type';
import { capitalizeWord, getRatingWidth } from '../../../utils';

type FavoriteCardPropsType = {
  favoriteOffer: OfferType,
}


const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  toggleIsFavorite(id: number, favoriteStatus: number) {
    dispatch(toggleIsFavoriteAction(id, favoriteStatus));
    dispatch(fetchFavoriteOffersAction());
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & FavoriteCardPropsType;


function FavoritesCard({favoriteOffer, toggleIsFavorite}: ConnectedComponentProps): JSX.Element {
  const { price, type, title, rating, previewImage, id, isFavorite } = favoriteOffer;

  const handleFavoriteButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const favoriteStatus = +(!isFavorite);
    toggleIsFavorite(id, favoriteStatus);
  };

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

export { FavoritesCard };
export default connector(FavoritesCard);
