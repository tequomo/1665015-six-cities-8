import { render } from '@testing-library/react';
import FavoritesEmpty from './favorites-empty';

describe('Component: Loader', () => {
  it('should render correctly', () => {
    const {getByText} = render(
      <FavoritesEmpty />,
    );

    expect(getByText('Favorites (empty)')).toBeInTheDocument();
    expect(getByText('Nothing yet saved.')).toBeInTheDocument();
  });

});
