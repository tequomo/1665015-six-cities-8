import { useState } from 'react';
import { MouseEvent } from 'react';
import { CITIES } from '../../../const';
import LocationsItemComponent from './locations-item-component';


function LocationsComponent(): JSX.Element {

  const [selectedCity, setSelectedCity] = useState<string>(CITIES[3]);

  const handleMouseClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setSelectedCity('');
    // eslint-disable-next-line no-console
    console.log(e.target);
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          CITIES.map((city) => <LocationsItemComponent key={city} cityName={city} selectedCity={selectedCity} onMenuItemClick={handleMouseClick}/>)
        }
      </ul>
    </section>
  );
}

export default LocationsComponent;
