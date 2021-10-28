import { useState } from 'react';
import { PlacesClassType } from '../../../types/classes-type';
import { OfferType } from '../../../types/offer-type';
import { ReviewType } from '../../../types/review-type';
import PlaceCard from '../place-card/place-card';

type OffersListPropsType = {
  offers: OfferType[],
  reviews: ReviewType[],
  transferActiveOfferId: (id: number | null) => void,
  customClasses: PlacesClassType,
}

function OffersList({offers, reviews, transferActiveOfferId, customClasses}: OffersListPropsType): JSX.Element {
  const {listClassName, tabsClassName} = customClasses;
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const handleMouseEnter = (id: number) => {
    setActiveCardId(id);
    transferActiveOfferId(id);
    // eslint-disable-next-line no-console
    // console.log(activeCardId);
  };

  const handleMouseLeave = (): void => {
    setActiveCardId(null);
    transferActiveOfferId(null);
    // eslint-disable-next-line no-console
    console.log(activeCardId);
  };

  return (
    <div className={`${listClassName} places__list ${tabsClassName}`}>
      {
        offers.map((offer: OfferType) => {
          const keyValue = `${offer.id}-${offer.city.name}`;
          const offerReviews = reviews.filter((review) => review.id === offer.id);
          return <PlaceCard key={keyValue} offer={offer} reviews={offerReviews} onCardOver={handleMouseEnter} onCardOut={handleMouseLeave} customClasses={customClasses}/>;
        },
        )
      }
    </div>
  );
}

export default OffersList;
