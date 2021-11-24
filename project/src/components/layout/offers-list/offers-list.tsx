import { useCallback } from 'react';
import { PlacesClassType } from '../../../types/classes-type';
import { OfferType } from '../../../types/offer-type';
import PlaceCard from '../place-card/place-card';

export type OffersListPropsType = {
  offers: OfferType[],
  transferActiveOfferId?: (id: number | null) => void,
  customClasses: PlacesClassType,
}

function OffersList({offers, transferActiveOfferId, customClasses}: OffersListPropsType): JSX.Element {
  const {listClassName, tabsClassName} = customClasses;

  const handleMouseEnter = useCallback((id: number) => {
    if(transferActiveOfferId) {
      transferActiveOfferId(id);
    }
  },[transferActiveOfferId]);

  const handleMouseLeave = useCallback((): void => {
    if(transferActiveOfferId) {
      transferActiveOfferId(null);
    }
  },[transferActiveOfferId]);

  return (
    <div className={`${listClassName} places__list ${tabsClassName}`}>
      {
        offers.map((offer: OfferType) => {
          const keyValue = `${offer.city.name}-${offer.id}`;
          return <PlaceCard key={keyValue} offer={offer} onCardOver={handleMouseEnter} onCardOut={handleMouseLeave} customClasses={customClasses}/>;
        },
        )
      }
    </div>
  );
}

export default OffersList;
