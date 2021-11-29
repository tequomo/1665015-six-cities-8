import { useState, useEffect, MutableRefObject } from 'react';
import { Map, TileLayer } from 'leaflet';
import { CityType } from '../types/offer-type';

const TILE_LAYER_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const TILE_LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

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
        TILE_LAYER_URL,
        {
          attribution: TILE_LAYER_ATTRIBUTION,
        },
      );

      instance.addLayer(layer);

      setMap(instance);
    } else {
      map?.setView({
        lat: location.latitude,
        lng: location.longitude,
      }, location.zoom);
    }

  }, [mapRef, map, city, location]);

  return map;
}

export default useMap;
