import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Router, Switch } from 'react-router';
import { AppRoute } from '../../../const';
import { Footer } from './footer';

const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const {
      getByAltText,
      getByRole,
    } = render(
      <Router history={history}>
        <Footer />
      </Router>,
    );

    expect(getByAltText('6 cities logo')).toBeInTheDocument();
    expect(getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to Main Page when user clicked to link', () => {
    history.push(AppRoute.Favorites);

    const {
      queryByText,
      getByRole,
    } = render(
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <h1>Wellcome to the Main page</h1>
          </Route>
          <Route>
            <Footer />
          </Route>
        </Switch>
      </Router>,
    );

    expect(queryByText(/Wellcome to the Main page/i)).not.toBeInTheDocument();
    userEvent.click(getByRole('link'));
    expect(queryByText(/Wellcome to the Main page/i)).toBeInTheDocument();
  });

});
