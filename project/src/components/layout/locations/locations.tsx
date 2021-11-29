import { memo, MouseEvent } from 'react';
import { CITIES } from '../../../const';
import LocationsItem from './locations-item';

type LocationsProps = {
  onMenuItemClick: (selectedCity: string) => void,
  selectedCity: string,
}

function Locations({onMenuItemClick, selectedCity}: LocationsProps): JSX.Element {

  const handleMouseClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onMenuItemClick(e.currentTarget.innerText);
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          CITIES.map((city) => <LocationsItem key={city} cityName={city} selectedCity={selectedCity} onLocationClick={handleMouseClick}/>)
        }
      </ul>
    </section>
  );
}

export { Locations };
export default memo(Locations);
