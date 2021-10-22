import { OfferType } from '../../../types/offer-type';
import NearPlaceComponent from '../near-place-component/near-place-component';

type NearPlacesListPropsType = {
  nearPlaces: OfferType[],
}

function NearPlacesListComponent({nearPlaces}: NearPlacesListPropsType): JSX.Element {
  return (
    <div className="near-places__list places__list">
      {nearPlaces.map((place) => <NearPlaceComponent key={place.id} nearPlace={place}/>)}
    </div>
  );
}

export default NearPlacesListComponent;
