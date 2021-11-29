import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import SignOutBlock from './signout-block';

const history = createMemoryHistory();
const fakeCallback = jest.fn();

describe('Component: SignOutBlock', () => {
  it('should render correctly', () => {
    const {getByText, getByRole} = render(
      <Router history={history}>
        <SignOutBlock onSignOut={fakeCallback} />
      </Router>,
    );

    expect(getByText('Sign out')).toBeInTheDocument();
    expect(getByRole('link')).toBeInTheDocument();
  });

  it('should run callback when user clicked link', () => {
    const {getByRole} = render(
      <Router history={history}>
        <SignOutBlock onSignOut={fakeCallback} />
      </Router>,
    );

    expect(fakeCallback).toBeCalledTimes(0);
    userEvent.click(getByRole('link'));
    expect(fakeCallback).toBeCalledTimes(1);
  });
});
