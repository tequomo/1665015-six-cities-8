import * as Redux from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { AppRoute, AuthStatus } from '../../../const';
import { getFakeAuthData, getFakeOffer } from '../../../utils/mock';
import PlaceCard from './place-card';
import { PlacesClassType } from '../../../types/classes-type';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeOffer = getFakeOffer();

const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const fakeClasses: PlacesClassType = {
  listClassName: 'string',
  cardClassName: 'string',
  wrapperClassName: 'string',
};

describe('Component: PlaceCard', () => {
  const fakeAuthData = getFakeAuthData();
  const store = mockStore(
    {
      USER_AUTH: {
        authStatus: AuthStatus.Auth,
        authUserData: fakeAuthData,
      },
    });

  const onCardOver = jest.fn();
  const onCardOut = jest.fn();

  const fakePlaceCard = (
    <Provider store={store}>
      <Router history={history}>
        <PlaceCard
          offer={fakeOffer}
          customClasses={fakeClasses}
          onCardOver={onCardOver}
          onCardOut={onCardOut}
        />
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    const { price, title } = fakeOffer;

    const {
      getByText,
    } = render(fakePlaceCard);

    expect(getByText(new RegExp(price.toString()))).toBeInTheDocument();
    expect(getByText(title)).toBeInTheDocument();
  });

  it('should call callback when user mouse over and out on card', () => {
    const {
      getByTestId,
    } = render(fakePlaceCard);

    userEvent.hover(getByTestId('place-card'));
    expect(onCardOver).toBeCalledTimes(1);

    userEvent.unhover(getByTestId('place-card'));
    expect(onCardOut).toBeCalledTimes(1);
  });

  it('should dispach an action when users clicks add/remove favorites', () => {
    useDispatch.mockReturnValue(dispatch);

    const {
      getByRole,
    } = render(fakePlaceCard);

    userEvent.click(getByRole('button'));
    expect(dispatch).toBeCalledTimes(1);
  });

  it(`should navigate to "${AppRoute.Offer}/:id"`, () => {

    const {
      getAllByTestId,
    } = render(fakePlaceCard);

    const links = getAllByTestId('path-to-offer');

    userEvent.click(links[0]);
    expect(history.location.pathname).toBe(`${AppRoute.Offer}${fakeOffer.id}`);

    history.push('/');
    expect(history.location.pathname).toBe('/');

    userEvent.click(links[1]);
    expect(history.location.pathname).toBe(`${AppRoute.Offer}${fakeOffer.id}`);
  });

});
