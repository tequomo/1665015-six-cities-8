import { MouseEvent } from 'react';
import { CustomClasses } from '../../../const';

type ButtonPropsType = {
  isFavorite: boolean,
  onFavoriteButtonClick: (e: MouseEvent<HTMLButtonElement>)  => void,
}

function FavoriteButton({onFavoriteButtonClick, isFavorite}: ButtonPropsType): JSX.Element {

  return (
    <button className={`place-card__bookmark-button ${isFavorite ? CustomClasses.CitiesPlaces.buttonClassName : ''} button`} type="button" onClick={onFavoriteButtonClick}>
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">${isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default FavoriteButton;
