import * as Redux from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { AuthStatus } from '../../../const';
import { getFakeOffer } from '../../../utils/mock';
import FavoriteCard from './favorite-card';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeOffer = getFakeOffer();

describe('Component: FavoriteCard', () => {
  const store = mockStore({
    USER: {
      authorizationStatus: AuthStatus.Auth,
    },
  });

  const fakeCard = (
    <Provider store={store}>
      <Router history={history}>
        <FavoriteCard favoriteOffer={fakeOffer} />
      </Router>
    </Provider>);

  it('should render component correctly', () => {
    const { price, title } = fakeOffer;
    const {
      getByText,
    } = render(fakeCard);
    expect(getByText(new RegExp(price.toString()))).toBeInTheDocument();
    expect(getByText(title)).toBeInTheDocument();
  });

  it('should dispach an action when users clicks add/remove favorites', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    const {
      getByRole,
    } = render(fakeCard);

    userEvent.click(getByRole('button'));
    expect(dispatch).toBeCalledTimes(1);
  });
});
