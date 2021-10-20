import { useState, useEffect, MutableRefObject } from 'react';
import { Map, TileLayer } from 'leaflet';
import { CityType } from '../types/offer-type';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: CityType): Map | null {
  const {location} = city;
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom,
      });

      const layer = new TileLayer (
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );

      instance.addLayer(layer);

      setMap(instance);
    }

  }, [mapRef, map, location]);

  return map;
}

export default useMap;
