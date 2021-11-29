import { render } from '@testing-library/react';
import PlaceCardMark from './place-card-mark';

describe('Component: PlaceCardMark', () => {
  it('should render correctly', () => {
    const {getByText} = render(
      <PlaceCardMark />,
    );

    expect(getByText(/Premium/i)).toBeInTheDocument();
  });

});
