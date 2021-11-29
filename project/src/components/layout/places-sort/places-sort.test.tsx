import { render } from '@testing-library/react';
import { CustomClasses, SortingTypes } from '../../../const';
import userEvent from '@testing-library/user-event';
import { PlacesSort } from './places-sort';


describe('Component: PlacesSort', () => {
  const handleSortItemClick = jest.fn();

  const fakePlacesSort = (
    <PlacesSort
      currentSortingType={SortingTypes.DEFAULT}
      onSelectSorting={handleSortItemClick}
    />);

  it('should render correctly', () => {
    const {
      getByText,
    } = render(fakePlacesSort);

    expect(getByText('Sort by')).toBeInTheDocument();
    expect(getByText(SortingTypes.TOP_RATED)).toBeInTheDocument();
  });
  it('should toggle form classes when user clicked on form header', () => {
    const {
      getAllByRole,
      getByRole,
    } = render(fakePlacesSort);

    expect(getByRole('list')).not.toHaveClass(CustomClasses.PlacesSort.listClassName);

    userEvent.click(getByRole('list'));
    expect(getByRole('list')).toHaveClass(CustomClasses.PlacesSort.listClassName);
    expect(
      getAllByRole('listitem')
        .find(
          (elem) => elem.classList.contains(CustomClasses.PlacesSort.itemClassName),
        ),
    )
      .toHaveClass(CustomClasses.PlacesSort.itemClassName);
  });

  it('should call callback when user click on sorting item', () => {
    const {
      getByText,
    } = render(fakePlacesSort);

    userEvent.click(getByText(SortingTypes.PRICE_DOWN));
    expect(handleSortItemClick).toBeCalledTimes(1);
  });

});
