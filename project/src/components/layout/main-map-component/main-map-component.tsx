import 'leaflet/dist/leaflet.css';
import { Icon, Marker } from 'leaflet';
import { useEffect, useRef } from 'react';
import { PinIconUrl } from '../../../const';
import useMap from '../../../hooks/useMap';
import { CityType, OfferType } from '../../../types/offer-type';

type MapPropsType = {
  city: CityType,
  offers: OfferType[],
  selectedOfferId: number | null,
}

const defaultPinIcon = new Icon({
  iconUrl: PinIconUrl.Default,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

const activePinIcon = new Icon({
  iconUrl: PinIconUrl.Active,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

function MainMapComponent({city, offers, selectedOfferId}: MapPropsType): JSX.Element {

  const mapRef = useRef(null);

  const map = useMap(mapRef, city);

  useEffect(() => {
    if(map) {
      offers.forEach((offer) => {
        const offerMarker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        offerMarker
          .setIcon(
            selectedOfferId !== null && offer.id === selectedOfferId ? activePinIcon : defaultPinIcon,
          )
          .addTo(map);
      });
    }
  }, [map, offers, selectedOfferId]);

  return (
    <div style={{height: '100%'}} ref={mapRef}>
    </div>
  );
}

export default MainMapComponent;
