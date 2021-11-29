import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CITIES } from '../../../const';
import { Locations } from './locations';

const fakeCallback = jest.fn();
const itemClassName = 'tabs__item--active';

describe('Component: Locations', () => {
  it('should render correctly without selected city', () => {
    const {
      getByText,
    } = render(
      <Locations selectedCity={''} onMenuItemClick={fakeCallback} />,
    );

    expect(getByText(CITIES[0])).toBeInTheDocument();
    expect(getByText(CITIES[4])).toBeInTheDocument();
  });

  it('should render correctly when user clicked on selected city', () => {
    const {
      getByText,
      getAllByRole,
    } = render(
      <Locations selectedCity={CITIES[2]} onMenuItemClick={fakeCallback} />,
    );

    userEvent.click(getByText(CITIES[2]));

    expect(getByText(CITIES[2])).toBeInTheDocument();
    expect(
      getAllByRole('link')
        .find(
          (elem) => elem.classList.contains(itemClassName),
        ),
    )
      .toHaveClass(itemClassName);
    expect(fakeCallback).toBeCalledTimes(1);
  });
});
