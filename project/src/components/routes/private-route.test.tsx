import { Router, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthStatus, AppRoute } from '../../const';
import PrivateRoute from './private-route';
import { createMemoryHistory } from 'history';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';


const onFakeUnathorized = jest.fn();
const api = createAPI(onFakeUnathorized());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const history = createMemoryHistory();

describe('Component: PrivateRoute', () => {
  beforeEach(() => {
    history.push('/private');
  });

  it('should render component for public route, when user not authorized', () => {
    const store = mockStore({
      USER_AUTH: {
        authStatus: AuthStatus.NoAuth,
      },
    });

    const {
      getByText,
      queryByText,
    } = render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.SignIn}><h1>Public Route</h1></Route>
          <PrivateRoute
            exact
            path="/private"
            render={() => (<h1>Private Route</h1>)}
          />
        </Router>
      </Provider>,
    );

    expect(getByText(/Public Route/i)).toBeInTheDocument();
    expect(queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const store = mockStore({
      USER_AUTH: {
        authStatus: AuthStatus.Auth,
      },
    });

    const {
      getByText,
      queryByText,
    } = render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.SignIn}><h1>Public Route</h1></Route>
          <PrivateRoute
            exact
            path="/private"
            render={() => (<h1>Private Route</h1>)}
          />
        </Router>
      </Provider>,
    );

    expect(getByText(/Private Route/i)).toBeInTheDocument();
    expect(queryByText(/Public Route/i)).not.toBeInTheDocument();
  });

});
