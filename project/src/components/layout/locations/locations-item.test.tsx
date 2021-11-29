import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getFakeCity } from '../../../utils/mock';
import LocationsItem from './locations-item';

const fakeCallback = jest.fn();
const fakeCity = getFakeCity();
const itemClassName = 'tabs__item--active';

describe('Component: LocationsItem', () => {
  it('should render correctly', () => {
    const {
      getByText,
      getByRole,
    } = render(
      <LocationsItem cityName={fakeCity.name} selectedCity={''} onLocationClick={fakeCallback} />,
    );

    expect(getByText(fakeCity.name)).toBeInTheDocument();
    expect(getByRole('link')).not.toHaveClass(itemClassName);
  });

  it('should render correctly when user clicked on selected city', () => {
    const {
      getByText,
      getByRole,
    } = render(
      <LocationsItem cityName={fakeCity.name} selectedCity={fakeCity.name} onLocationClick={fakeCallback} />,
    );

    userEvent.click(getByRole('link'));

    expect(getByText(fakeCity.name)).toBeInTheDocument();
    expect(getByRole('link')).toHaveClass(itemClassName);
    expect(fakeCallback).toBeCalledTimes(1);
  });

});
