import { MouseEvent } from 'react';
import { CustomClasses } from '../../../const';

type LocItemPropsType = {
  cityName: string;
  selectedCity: string,
  onLocationClick: (e:  MouseEvent<HTMLAnchorElement>) => void,
}

function LocationsItem({cityName, selectedCity, onLocationClick}: LocItemPropsType): JSX.Element {
  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${selectedCity === cityName ? CustomClasses.LocationsTab.itemClassName : ''}`} href="/" onClick={onLocationClick}>
        <span>{cityName}</span>
      </a>
    </li>
  );
}

export default LocationsItem;
