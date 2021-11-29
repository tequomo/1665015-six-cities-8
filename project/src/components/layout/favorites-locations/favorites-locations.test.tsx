import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthStatus } from '../../../const';
import { getFakeOffer } from '../../../utils/mock';
import FavoritesLocations from './favorites-locations';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeOffer = getFakeOffer();

describe('Component: FavoritesLocations', () => {
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
          <FavoritesLocations locationOffers={[fakeOffer]} />
        </Router>
      </Provider>,
    );

    expect(getByText(fakeOffer.title)).toBeInTheDocument();
    expect(getByText(fakeOffer.city.name)).toBeInTheDocument();
    expect(getAllByRole('article').length).toBe([fakeOffer].length);
  });

  it('should reditect to  Main Page when user clicked to link', () => {
    history.push(AppRoute.Favorites);

    const {
      getByText,
      queryByText,
    } = render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/" exact>
              <h1>Wellcome to the Main page</h1>
            </Route>
            <Route>
              <FavoritesLocations locationOffers={[fakeOffer]} />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(queryByText(/Wellcome to the Main page/i)).not.toBeInTheDocument();
    userEvent.click(getByText(fakeOffer.city.name));
    expect(queryByText(/Wellcome to the Main page/i)).toBeInTheDocument();
  });

});
