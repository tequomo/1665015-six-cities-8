import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { AuthStatus, LoadingStatus } from '../../../const';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { createAPI } from '../../../services/api';
import { State } from '../../../types/state';
import { getFakeReviews } from '../../../utils/mock';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import ReviewsForm from './reviews-form';
import { datatype } from 'faker';


const onFakeUnathorized = jest.fn();
const api = createAPI(onFakeUnathorized());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);


const history = createMemoryHistory();
const store = mockStore({
  USER_AUTH: {
    authStatus: AuthStatus.Auth,
  },
  REVIEWS_DATA: {
    offerReviews: getFakeReviews(),
    offerReviewsLoadingStatus: LoadingStatus.Idle,
  },
});


describe('Component: ReviewsForm', () => {
  const fakeReviewsForm = (
    <Provider store={store}>
      <Router history={history}>
        <ReviewsForm />
      </Router>
    </Provider>);

  const shortMessage = datatype.string(20);
  const strengthMessage = datatype.string(400);
  const fittedMessage = datatype.string(100);

  it('should render correctly', () => {
    const {
      getByLabelText,
      getByRole,
    } = render(fakeReviewsForm);

    expect(getByLabelText(/Your review/i)).toBeInTheDocument();
    expect(getByRole('textbox')).toBeInTheDocument();
    expect(getByRole('button')).toBeDisabled();
  });

  it('should set disabled button when incorrect input', () => {
    const {
      getByTitle,
      getByRole,
    } = render(fakeReviewsForm);

    userEvent.click(getByTitle('good'));
    expect(getByRole('button')).toBeDisabled();

    userEvent.type(getByRole('textbox'), shortMessage);
    expect(getByRole('button')).toBeDisabled();

    userEvent.type(getByRole('textbox'), strengthMessage);
    expect(getByRole('button')).toBeDisabled();

    userEvent.click(getByTitle('good'));
    userEvent.type(getByRole('textbox'), fittedMessage);
    expect(getByRole('button')).toHaveAttribute('disabled', '');
  });

  it('should be disabled when has is posting status', () => {
    const updatedStore = mockStore({
      USER_AUTH: {
        authStatus: AuthStatus.Auth,
      },
      REVIEWS_DATA: {
        offerReviews: getFakeReviews(),
        reviewLoadingStatus: LoadingStatus.Loading,
      },
    });
    const isPostingFakeForm = (
      <Provider store={updatedStore}>
        <Router history={history}>
          <ReviewsForm />
        </Router>
      </Provider>);

    const {
      getAllByRole,
      getByRole,
    } = render(isPostingFakeForm);

    const radioButtons = getAllByRole('radio');
    radioButtons.map((button) => expect(button).toBeDisabled());
    expect(getByRole('textbox')).toBeDisabled();
    expect(getByRole('button')).toBeDisabled();
  });

});
