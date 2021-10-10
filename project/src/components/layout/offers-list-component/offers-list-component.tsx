import { OfferType } from '../../../types/offer-type';
import PlaceCardComponent from '../place-card-component/place-card-component';

type MainProps = {
  offers: OfferType[],
}

function OffersListComponent({offers}: MainProps): JSX.Element {
  return (
    <>
      {
        offers.map((offer) => {
          const keyValue = `${offer.id}-${offer.city.name}`;
          return <PlaceCardComponent key={keyValue} {...offer} />;
        },
        )
      }
    </>
  );
}

export default OffersListComponent;
