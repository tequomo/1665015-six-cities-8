import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeStore } from '../../utils/mock';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { AppRoute, AuthStatus } from '../../const';
import App from './app';


const onFakeUnathorized = jest.fn();
const api = createAPI(onFakeUnathorized());
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);


function getFakeApp (authStatus: AuthStatus): JSX.Element {
  const fakeStore = getFakeStore(authStatus);
  const store = mockStore(fakeStore);
  return (
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
}

describe('Application routing', () => {
  it('should render MainScreen when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    const {
      getByText,
    } = render(getFakeApp(AuthStatus.Unknown));

    expect(getByText(/Places/i)).toBeInTheDocument();
  });

  it('should render SignInScreen when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);
    const {
      getByTestId,
    } = render(getFakeApp(AuthStatus.NoAuth));

    expect(getByTestId(/login/i)).toBeInTheDocument();
    expect(getByTestId(/password/i)).toBeInTheDocument();
  });

  it('should render FavoritesScreen when user navigate to "/favorites"', () => {
    history.push(AppRoute.Favorites);
    const {
      getByTestId,
    } = render(getFakeApp(AuthStatus.Auth));

    expect(getByTestId('favorites-screen')).toBeInTheDocument();
  });

  it('should render PropertyScreen when user navigate to "/offer/:id"', () => {
    history.push(`${AppRoute.Offer}1`);
    const {
      getByTestId,
    } = render(getFakeApp(AuthStatus.Auth));

    expect(getByTestId('offer-container')).toBeInTheDocument();
  });

  it('should render NotFoundScreen when user navigate to incorrect route', () => {
    history.push('/incorrect');
    const {
      getByText,
      getAllByText,
    } = render(getFakeApp(AuthStatus.Auth));

    expect(getByText('404')).toBeInTheDocument();
    expect(getAllByText(/Page not found/i)[0]).toBeInTheDocument();
    expect(getByText('Back to main page')).toBeInTheDocument();
  });
});
