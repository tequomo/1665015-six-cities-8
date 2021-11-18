import { MouseEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../const';
import { selectCity } from '../../../store/action';
import { ThunkAppDispatch } from '../../../types/action';
import { OfferType } from '../../../types/offer-type';
import FavoritesCard from '../favorites-card/favorites-card';

type FavoritePropsType = {
  locationsOffers: OfferType[],
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onCityClick(cityName: string) {
    dispatch(selectCity(cityName));
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & FavoritePropsType;

function FavoritesLocations({locationsOffers, onCityClick}: ConnectedComponentProps): JSX.Element {

  const handleCityClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    onCityClick(e.currentTarget.innerText);
  };

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={AppRoutes.Main} onClick={handleCityClick}>
            <span>{locationsOffers[0].city.name}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {
          locationsOffers.map((offer) => {
            const keyValue = `${offer.id}-${offer.city.name}`;
            return <FavoritesCard key={keyValue} favoriteOffer={offer} />;
          },
          )
        }
      </div>
    </li>
  );
}

export { FavoritesLocations };
export default connector(FavoritesLocations);
