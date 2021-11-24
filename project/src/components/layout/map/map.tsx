import 'leaflet/dist/leaflet.css';
import { Icon, Marker } from 'leaflet';
import { useEffect, useRef } from 'react';
import { PinIconUrl } from '../../../const';
import useMap from '../../../hooks/useMap';
import { OfferType } from '../../../types/offer-type';

type MapPropsType = {
  offers: OfferType[],
  selectedOfferId: number | null,
  currentOffer?: OfferType,
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

function Map({offers, selectedOfferId, currentOffer}: MapPropsType): JSX.Element {

  const city = currentOffer ? currentOffer.city: offers[0].city;

  const mapRef = useRef(null);

  const map = useMap(mapRef, city);

  useEffect(() => {
    if(map) {

      if (currentOffer) {
        const currentMarker = new Marker({
          lat: currentOffer.location.latitude,
          lng: currentOffer.location.longitude,
        });
        currentMarker.setIcon(activePinIcon)
          .addTo(map);
      }

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
  }, [map, offers, city, selectedOfferId, currentOffer]);

  return (
    <div style={{height: '100%'}} ref={mapRef}>
    </div>
  );
}

export default Map;
