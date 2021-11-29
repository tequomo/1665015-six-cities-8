import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { AuthStatus } from '../../../const';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { createAPI } from '../../../services/api';
import { State } from '../../../types/state';
import userEvent from '@testing-library/user-event';
import RatingStars from './rating-stars';
import { getFakeReview, getFakeReviews } from '../../../utils/mock';

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
  },
});


describe('Component: RatingStars', () => {
  const handleRatingChange= jest.fn();

  const fakeRatingStars = (
    <Provider store={store}>
      <Router history={history}>
        <RatingStars
          rating={getFakeReview().rating}
          onRatingChange={handleRatingChange}
        />
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    const {
      getAllByRole,
    } = render(fakeRatingStars);

    const radioButtons = getAllByRole('radio');

    expect(radioButtons[0]).toBeInTheDocument();
    expect(radioButtons.length).toBe(5);
  });

  it('should call callback when user click on star', () => {
    const {
      getByTitle,
    } = render(fakeRatingStars);

    userEvent.click(getByTitle('good'));
    expect(handleRatingChange).toBeCalledTimes(1);
  });

});
