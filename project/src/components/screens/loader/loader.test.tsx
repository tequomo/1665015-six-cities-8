import { render } from '@testing-library/react';
import Loader from './loader';

describe('Component: Loader', () => {
  it('should render correctly', () => {
    const {getByTestId} = render(
      <Loader />,
    );

    expect(getByTestId('loader')).toBeInTheDocument();
  });

});
