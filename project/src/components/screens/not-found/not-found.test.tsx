import { render } from '@testing-library/react';
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import NotFoundScreen from './not-found';
import { Provider } from 'react-redux';
import { createAPI } from '../../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeStore } from '../../../utils/mock';
import { State } from '../../../types/state';
import { AuthStatus } from '../../../const';
import userEvent from '@testing-library/user-event';

const FAKE_URL = '/nonexist';

const onFakeUnathorized = jest.fn();
const api = createAPI(onFakeUnathorized());
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const fakeStore = getFakeStore(AuthStatus.NoAuth);
    const store = mockStore(fakeStore);
    const {
      getByText,
      getAllByText,
    } = render(
      <Provider store={store}>
        <Router history={history}>
          <NotFoundScreen />
        </Router>
      </Provider>,
    );

    expect(getByText('404')).toBeInTheDocument();
    expect(getAllByText(/Page not found/i)[0]).toBeInTheDocument();
    expect(getByText('Back to main page')).toBeInTheDocument();
  });

  it('should redirect to main page when user clicked to link', () => {
    const fakeStore = getFakeStore(AuthStatus.NoAuth);
    const store = mockStore(fakeStore);
    history.push(FAKE_URL);

    const { getByText, queryByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/" exact>
              <h1>Wellcome to the Main page</h1>
            </Route>
            <Route>
              <NotFoundScreen />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(queryByText(/Wellcome to the Main page/i)).not.toBeInTheDocument();
    userEvent.click(getByText('Back to main page'));
    expect(queryByText(/Wellcome to the Main page/i)).toBeInTheDocument();
  });

});
