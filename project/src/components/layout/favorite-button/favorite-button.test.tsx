import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoriteButton from './favorite-button';

const onFavoriteButtonClick = jest.fn();
const buttonClassName ='place-card__bookmark-button--active';


describe('Component: FavoriteButton', () => {
  it('should render correctly when isFavorite is false', () => {
    const {
      getByText,
      getByRole,
    } = render(
      <FavoriteButton isFavorite={false} onFavoriteButtonClick={onFavoriteButtonClick}/>,
    );

    expect(getByText(/To bookmarks/i)).toBeInTheDocument();
    expect(getByRole('button')).not.toHaveClass(buttonClassName);

  });

  it('should render correctly when isFavorite is true', () => {
    const {
      getByText,
      getByRole,
    } = render(
      <FavoriteButton isFavorite onFavoriteButtonClick={onFavoriteButtonClick}/>,
    );

    expect(getByText(/In bookmarks/i)).toBeInTheDocument();
    expect(getByRole('button')).toHaveClass(buttonClassName);

  });

  it('should called callback when user clicks to button', () => {
    const {
      getByRole,
    } = render(
      <FavoriteButton isFavorite onFavoriteButtonClick={onFavoriteButtonClick}/>,
    );

    expect(getByRole('button')).toHaveClass(buttonClassName);

    expect(onFavoriteButtonClick).toBeCalledTimes(0);
    userEvent.click(getByRole('button'));
    expect(onFavoriteButtonClick).toBeCalledTimes(1);
  });

});
