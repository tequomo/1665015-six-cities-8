import { render } from '@testing-library/react';
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { AppRoute, AuthStatus } from '../../../const';
import Auth from './auth';
import { getFakeAuthData } from '../../../utils/mock';

const mockStore = configureMockStore();
const store = mockStore(
  {
    USER_AUTH: {
      authStatus: AuthStatus.NoAuth,
    },
  },
);

describe('Component: Auth', () => {
  it('should render Auth when user is not authorized', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Main);

    const {
      getByText,
      queryByText,
    } = render(
      <Provider store={store}>
        <Router history={history}>
          <Auth />
        </Router>
      </Provider>,
    );

    expect(getByText(/Sign in/i)).toBeInTheDocument();
    expect(queryByText(/Sign Out/i)).not.toBeInTheDocument();

  });

  it('should redirect to SignIn when unauthorized user clicked to link', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Main);

    const {
      queryByText,
      getByRole,
    } = render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/login" exact>
              <h1>Wellcome to SignIn Page</h1>
            </Route>
            <Route>
              <Auth />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(queryByText(/Wellcome to SignIn Page/i)).not.toBeInTheDocument();
    userEvent.click(getByRole('link'));
    expect(queryByText(/Wellcome to SignIn Page/i)).toBeInTheDocument();

  });

  it('should redirect to Favorites when authorized user clicked to link', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Main);

    const fakeAuthData = getFakeAuthData();

    const updatedStore = mockStore(
      {
        USER_AUTH: {
          authStatus: AuthStatus.Auth,
          authUserData: fakeAuthData,
        },
      });

    const {
      getByText,
      getAllByRole,
      queryByText,
    } = render(
      <Provider store={updatedStore}>
        <Router history={history}>
          <Switch>
            <Route path="/favorites" exact>
              <h1>Wellcome to Favorites</h1>
            </Route>
            <Route>
              <Auth />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(getByText(/Sign Out/i)).toBeInTheDocument();
    expect(getByText(fakeAuthData.email)).toBeInTheDocument();
    expect(queryByText(/Sign in/i)).not.toBeInTheDocument();

    expect(queryByText(/Wellcome to Favorites/i)).not.toBeInTheDocument();
    userEvent.click(getAllByRole('link')[0]);
    expect(queryByText(/Wellcome to Favorites/i)).toBeInTheDocument();

  });
});
