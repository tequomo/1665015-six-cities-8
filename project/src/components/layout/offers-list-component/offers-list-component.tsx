import { useState } from 'react';
import { OfferType } from '../../../types/offer-type';
import { ReviewType } from '../../../types/review-type';
import PlaceCardComponent from '../place-card-component/place-card-component';

type OffersListPropsType = {
  offers: OfferType[],
  reviews: ReviewType[],
}

function OffersListComponent({offers, reviews}: OffersListPropsType): JSX.Element {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const handleMouseEnter = (id: number) => {
    setActiveCardId(id);
    // eslint-disable-next-line no-console
    console.log(activeCardId);
  };

  const handleMouseLeave = (): void => {
    setActiveCardId(null);
    // eslint-disable-next-line no-console
    console.log(activeCardId);
  };

  return (
    <>
      {
        offers.map((offer: OfferType) => {
          const keyValue = `${offer.id}-${offer.city.name}`;
          // const offerReviews =
          return <PlaceCardComponent key={keyValue} offer={offer} onCardOver={handleMouseEnter} onCardOut={handleMouseLeave} />;
        },
        )
      }
    </>
  );
}

export default OffersListComponent;
