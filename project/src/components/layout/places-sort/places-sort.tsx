import { memo, MouseEvent, useState } from 'react';
import { CustomClasses, SortingTypes } from '../../../const';

type SortProps = {
  currentSortingType: string,
  onSelectSorting: (sortingType: string) => void,
}

function PlacesSort({currentSortingType, onSelectSorting}: SortProps): JSX.Element {

  const [isOpened, setIsOpened] = useState(false);

  const handleSortFormClick = (): void => {
    setIsOpened((prevState) => prevState = !prevState);
  };

  const handleSortItemClick = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    onSelectSorting(e.currentTarget.innerText);
    setIsOpened((prevState) => prevState = !prevState);
  };

  return (
    <form className="places__sorting" action="#" method="get"  onClick={() => handleSortFormClick()}>
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}>
        {currentSortingType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened ? CustomClasses.PlacesSort.listClassName : ''}`}>
        {
          Object.values(SortingTypes)
            .map((type) => (
              <li key={type} className={`places__option ${currentSortingType === type ? CustomClasses.PlacesSort.itemClassName : ''}`} tabIndex={0} onClick={(e) => handleSortItemClick(e)}>
                {type}
              </li>),
            )
        }
      </ul>
    </form>
  );
}

export default memo(PlacesSort);
