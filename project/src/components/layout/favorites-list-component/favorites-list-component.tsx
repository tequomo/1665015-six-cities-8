import { OfferType } from '../../../types/offer-type';
import FavoritesLocationsComponent from '../favorites-locations-component/favorites-locations-component';

function FavoritesListComponent(offersProps: OfferType[]): JSX.Element {
  // eslint-disable-next-line no-console
  console.log('offerProps', offersProps);
  const favorites: OfferType[] = offersProps.filter((offer) => offer.isFavorite);
  const favoriteCities: string[] = [...new Set(favorites.map((favorite) => favorite.city.name))];

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {
          favoriteCities
            .map((city) => <FavoritesLocationsComponent key={city} {...(favorites.filter((favorite) => (favorite.city.name === city)))} />,
            )
        }
      </ul>
    </section>
  );
}

export default FavoritesListComponent;
