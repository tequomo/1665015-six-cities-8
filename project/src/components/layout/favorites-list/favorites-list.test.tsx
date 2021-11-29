import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthStatus } from '../../../const';
import { getFakeOffer } from '../../../utils/mock';
import FavoritesList from './favorites-list';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeOffer = getFakeOffer();

describe('Component: FavoritesList', () => {
  const store = mockStore({
    USER_AUTH: {
      authStatus: AuthStatus.Auth,
    },
    FAVORITES_DATA: {
      favoriteOffers: [fakeOffer],
    },
  });

  it('should render correctly with offers', () => {
    history.push(AppRoute.Favorites);

    const {
      getByText,
      getAllByRole,
    } = render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritesList favoriteOffers={[fakeOffer]} />
        </Router>
      </Provider>,
    );

    expect(getByText(fakeOffer.title)).toBeInTheDocument();
    expect(getByText(fakeOffer.city.name)).toBeInTheDocument();
    expect(getByText(/Saved listing/i)).toBeInTheDocument();
    expect(getAllByRole('article').length).toBe([fakeOffer].length);
  });

});
