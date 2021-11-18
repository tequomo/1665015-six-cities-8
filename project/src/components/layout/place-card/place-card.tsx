// import { useState } from 'react';
import { MouseEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { AppRoutes, AuthStatus } from '../../../const';
import { toggleIsFavoriteAction } from '../../../services/api-actions';
import { ThunkAppDispatch } from '../../../types/action';
import { PlacesClassType } from '../../../types/classes-type';
import { OfferType } from '../../../types/offer-type';
import { State } from '../../../types/state';
import { capitalizeWord, getRatingWidth } from '../../../utils';
import FavoriteButton from './favorite-button';
import PlaceCardMark from './place-card-mark';

type CardPropsType = {
  offer: OfferType,
  onCardOver: (id: number) => void,
  onCardOut: () => void,
  customClasses: PlacesClassType,
}

const mapStateToProps = ({authStatus, toggleIsFavoriteLoadingStatus}: State) => ({
  authStatus,
  toggleIsFavoriteLoadingStatus,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  toggleIsFavorite(id: number, favoriteStatus: number) {
    dispatch(toggleIsFavoriteAction(id, favoriteStatus));
    // dispatch(fetchOffersAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & CardPropsType;


function PlaceCard({offer, onCardOver, onCardOut, customClasses, authStatus, toggleIsFavorite, toggleIsFavoriteLoadingStatus}: ConnectedComponentProps): JSX.Element {
  const { isPremium, isFavorite, price, type, title, rating, previewImage, id } = offer;
  const {cardClassName, wrapperClassName} = customClasses;
  const isAuth = authStatus === AuthStatus.Auth;
  const history = useHistory();

  const handleFavoriteButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (!isAuth) {
      history.push(AppRoutes.SignIn);
      return;
    }
    const favoriteStatus = +(!isFavorite);
    // eslint-disable-next-line no-console
    console.log(favoriteStatus);
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

export { PlaceCard };
export default connector(PlaceCard);
