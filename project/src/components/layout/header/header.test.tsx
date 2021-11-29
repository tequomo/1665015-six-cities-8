import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { AppRoute, AuthStatus } from '../../../const';
import { Header } from './header';

const history = createMemoryHistory();

describe('Component: Header', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Main);

    const {
      queryByText,
      getByRole,
      getByAltText,
    } = render(
      <Router history={history}>
        <Header renderAuth={false}/>
      </Router>,
    );

    expect(getByAltText('6 cities logo')).toBeInTheDocument();
    expect(getByRole('link')).toBeInTheDocument();
    expect(queryByText(/Sign in/i)).not.toBeInTheDocument();
  });

  it('should render correctly with Auth component', () => {

    const mockStore = configureMockStore();
    const store = mockStore({
      USER_AUTH: {
        authStatus: AuthStatus.NoAuth,
      },
    });

    history.push(AppRoute.Main);

    const {
      getByText,
    } = render(
      <Provider store={store}>
        <Router history={history}>
          <Header renderAuth/>
        </Router>
      </Provider>,
    );

    expect(getByText(/Sign in/i)).toBeInTheDocument();
  });
});
