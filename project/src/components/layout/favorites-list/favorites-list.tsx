import { useSelector } from 'react-redux';
import { getFavoriteCities } from '../../../store/reducers/favorites-data/selectors';
import { OfferType } from '../../../types/offer-type';
import { getSelectedCityOffers } from '../../../utils';
import FavoritesLocations from '../favorites-locations/favorites-locations';

type FavoriteListPropsType = {
  favoriteOffers: OfferType[]
}

function FavoritesList({favoriteOffers}: FavoriteListPropsType): JSX.Element {
  const favoriteCities = useSelector(getFavoriteCities);

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {
          favoriteCities
            .map((city) => <FavoritesLocations key={city} locationOffers={getSelectedCityOffers(favoriteOffers, city)} />,
            )
        }
      </ul>
    </section>
  );
}

export default FavoritesList;
