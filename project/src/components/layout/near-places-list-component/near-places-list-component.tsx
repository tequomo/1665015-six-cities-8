import { OfferType } from '../../../types/offer-type';
import NearPlaceComponent from '../near-place-component/near-place-component';

type NearPlacesListPropsType = {
  nearPlaces: OfferType[],
}

function NearPlacesListComponent({nearPlaces}: NearPlacesListPropsType): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {nearPlaces.map((place) => <NearPlaceComponent key={place.id} nearPlace={place}/>)}
      </div>
    </section>
  );
}

export default NearPlacesListComponent;
