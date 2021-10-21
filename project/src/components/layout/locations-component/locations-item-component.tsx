import { MouseEvent } from 'react';

type LocItemPropsType = {
  cityName: string;
  selectedCity?: string,
  onMenuItemClick: (e:  MouseEvent<HTMLAnchorElement>) => void,
}

function LocationsItemComponent({cityName, selectedCity = 'Amsterdam', onMenuItemClick}: LocItemPropsType): JSX.Element {
  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${selectedCity === cityName ? 'tabs__item--active' : ''}`} href="/" onClick={onMenuItemClick}>
        <span>{cityName}</span>
      </a>
    </li>
  );
}

export default LocationsItemComponent;
