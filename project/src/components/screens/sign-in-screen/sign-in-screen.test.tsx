import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import SignInScreen from './sign-in-screen';
import { AppRoute } from '../../../const';
import { AuthStatus } from '../../../const';

const mockStore = configureMockStore();
const store = mockStore(
  {
    USER_AUTH: {
      authStatus: AuthStatus.Unknown,
    },
  },
);

describe('Component: SignInScreen', () => {
  it('should render SignInScreen when user click to "Sign In"', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.SignIn);

    const {
      getByPlaceholderText,
      getByTestId,
      getByDisplayValue,
    } = render(
      <Provider store={store}>
        <Router history={history}>
          <SignInScreen />
        </Router>
      </Provider>,
    );

    expect(getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(getByPlaceholderText(/Password/i)).toBeInTheDocument();

    userEvent.type(getByTestId('login'), 'user@6sities.com');
    userEvent.type(getByTestId('password'), '6cities');

    expect(getByDisplayValue(/user@6sities.com/i)).toBeInTheDocument();
    expect(getByDisplayValue(/6cities/i)).toBeInTheDocument();
  });
});
