import { OfferType } from '../../../types/offer-type';
import FavoritesCardComponent from '../favorites-card-component/favorites-card-component';

type FavoritePropsType = {
  locationsOffersProps: OfferType[],
}

function FavoritesLocationsComponent({locationsOffersProps}: FavoritePropsType): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="/">
            <span>{locationsOffersProps[0].city.name}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {
          locationsOffersProps.map((offer) => {
            const keyValue = `${offer.id}-${offer.city.name}`;
            return <FavoritesCardComponent key={keyValue} favoriteCard={offer} />;
          },
          )
        }
      </div>
    </li>
  );
}

export default FavoritesLocationsComponent;
