import { MouseEvent } from 'react';

type LocItemPropsType = {
  cityName: string;
  selectedCity: string,
  onLocationClick: (e:  MouseEvent<HTMLAnchorElement>) => void,
}

function LocationsItem({cityName, selectedCity = 'Amsterdam', onLocationClick}: LocItemPropsType): JSX.Element {
  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${selectedCity === cityName ? 'tabs__item--active' : ''}`} href="/" onClick={onLocationClick}>
        <span>{cityName}</span>
      </a>
    </li>
  );
}

export default LocationsItem;
