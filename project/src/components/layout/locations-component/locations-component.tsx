// import { useState } from 'react';
import { MouseEvent } from 'react';
import { CITIES } from '../../../const';
import LocationsItemComponent from './locations-item-component';

type LocationsProps = {
  onMenuItemClick: (selectedCity: string) => void,
  selectedCity: string,
}

function LocationsComponent({onMenuItemClick, selectedCity}: LocationsProps): JSX.Element {

  // const [selectedCity, setSelectedCity] = useState<string>(CITIES[3]);

  const handleMouseClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // setSelectedCity(e.currentTarget.innerText);
    onMenuItemClick(e.currentTarget.innerText);
    // eslint-disable-next-line no-console
    console.log(e.currentTarget.innerText);
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          CITIES.map((city) => <LocationsItemComponent key={city} cityName={city} selectedCity={selectedCity} onLocationClick={handleMouseClick}/>)
        }
      </ul>
    </section>
  );
}

export default LocationsComponent;
