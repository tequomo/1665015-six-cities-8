import { useState } from 'react';
import { OfferType } from '../../../types/offer-type';
import { ReviewType } from '../../../types/review-type';
import PlaceCardComponent from '../place-card-component/place-card-component';

type OffersListPropsType = {
  offers: OfferType[],
  reviews: ReviewType[],
}

function OffersListComponent({offers, reviews}: OffersListPropsType): JSX.Element {
  const [activeCard, setActiveCard] = useState<OfferType | null>(null);

  const handleMouseEnter = (offer: OfferType) => {
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
