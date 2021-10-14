import { useState } from 'react';
import { OfferType } from '../../../types/offer-type';
import PlaceCardComponent from '../place-card-component/place-card-component';

type MainProps = {
  offers: OfferType[],
}

function OffersListComponent({offers}: MainProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<OfferType | null>(null);

  const handleMouseEnter = (offer: OfferType): void => {
    setActiveCard(offer);
    // eslint-disable-next-line no-console
    console.log(activeCard);
  };

  const handleMouseLeave = (): void => {
    setActiveCard(null);
    // eslint-disable-next-line no-console
    console.log(activeCard);
  };

  return (
    <>
      {
        offers.map((offer) => {
          const keyValue = `${offer.id}-${offer.city.name}`;
          return <PlaceCardComponent key={keyValue} {...offer} {...handleMouseEnter} {...handleMouseLeave}/>;
        },
        )
      }
    </>
  );
}

export default OffersListComponent;
