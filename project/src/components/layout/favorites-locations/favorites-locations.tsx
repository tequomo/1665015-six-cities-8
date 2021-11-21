import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../const';
import { selectCity } from '../../../store/action';
import { OfferType } from '../../../types/offer-type';
import FavoritesCard from '../favorites-card/favorites-card';

type FavoritePropsType = {
  locationOffers: OfferType[],
}

function FavoritesLocations({locationOffers}: FavoritePropsType): JSX.Element {

  const dispatch = useDispatch();

  const selectCityItem = (cityName: string) => {
    dispatch(selectCity(cityName));
  };

  const handleCityClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    selectCityItem(e.currentTarget.innerText);
  };

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={AppRoutes.Main} onClick={handleCityClick}>
            <span>{locationOffers[0].city.name}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {
          locationOffers.map((offer) => {
            const keyValue = `${offer.id}-${offer.city.name}`;
            return <FavoritesCard key={keyValue} favoriteOffer={offer} />;
          },
          )
        }
      </div>
    </li>
  );
}

export default FavoritesLocations;
