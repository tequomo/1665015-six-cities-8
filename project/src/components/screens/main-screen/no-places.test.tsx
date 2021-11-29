import { render } from '@testing-library/react';
import { getFakeCity } from '../../../utils/mock';
import NoPlaces from './no-places';

const selectedCity = getFakeCity().name;

describe('Component: NoPlaces', () => {
  it('should render correctly', () => {
    const {getByText} = render(
      <NoPlaces selectedCity={selectedCity} />,
    );

    expect(getByText('No places to stay available')).toBeInTheDocument();
    expect(getByText(new RegExp(selectedCity, 'i'))).toBeInTheDocument();
  });

});
