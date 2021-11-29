import { render } from '@testing-library/react';
import Map from './map';
import { getFakeOffers } from '../../../utils/mock';

const fakeOffers = getFakeOffers();

describe('Component: Map', () => {
  it('should render correctly', () => {

    const {
      getByTitle,
      getByText,
    } = render(
      <Map selectedOfferId={fakeOffers[1].id} currentOffer={fakeOffers[0]} offers={fakeOffers}/>,
    );

    expect(getByTitle(/A JS library for interactive maps/i)).toHaveTextContent(/Leaflet/i);
    expect(getByText(/OpenStreetMap/i)).toBeInTheDocument();
  });
});

