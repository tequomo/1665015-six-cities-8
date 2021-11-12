import { OfferType } from '../../../types/offer-type';
import FavoritesLocations from '../favorites-locations/favorites-locations';

type FavoriteListPropsType = {
  favoriteOffers: OfferType[]
}

function FavoritesList({favoriteOffers}: FavoriteListPropsType): JSX.Element {
  // const favorites: OfferType[] = offers.filter((offer) => offer.isFavorite);
  const favoriteCities: string[] = [...new Set(favoriteOffers.map((favorite) => favorite.city.name))];

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {
          favoriteCities
            .map((city) => <FavoritesLocations key={city} locationsOffers={favoriteOffers.filter((favorite) => (favorite.city.name === city))} />,
            )
        }
      </ul>
    </section>
  );
}

export default FavoritesList;
