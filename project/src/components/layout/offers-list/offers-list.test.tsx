import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { AuthStatus } from '../../../const';
import { getFakeOffer } from '../../../utils/mock';
import OffersList from './offers-list';
import { PlacesClassType } from '../../../types/classes-type';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeOffer = getFakeOffer();
const fakeOffers = [fakeOffer];

const transferCallback = jest.fn();

const fakeClasses: PlacesClassType = {
  listClassName: 'string',
  cardClassName: 'string',
  wrapperClassName: 'string',
};

describe('Component: OffersList', () => {
  const store = mockStore({
    USER_AUTH: {
      authStatus: AuthStatus.Auth,
    },
  });

  const FakeApp = (
    <Provider store={store}>
      <Router history={history}>
        <OffersList offers={fakeOffers} transferActiveOfferId={transferCallback} customClasses={fakeClasses} />
      </Router>
    </Provider>);

  it('should render correctly', () => {
    const { price, title } = fakeOffer;
    const {
      getByText,
    } = render(FakeApp);

    expect(getByText(new RegExp(price.toString()))).toBeInTheDocument();
    expect(getByText(title)).toBeInTheDocument();
  });

  it('should call callback when user mouse over and out on card', () => {
    const {
      getByTestId,
    } = render(FakeApp);

    userEvent.hover(getByTestId('place-card'));
    expect(transferCallback).toBeCalledWith(fakeOffer.id);

    userEvent.unhover(getByTestId('place-card'));
    expect(transferCallback).toBeCalledWith(null);
  });

});
