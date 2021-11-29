import { render } from '@testing-library/react';
import ReviewsList from './review-list';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { AuthStatus, LoadingStatus } from '../../../const';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { createAPI } from '../../../services/api';
import { State } from '../../../types/state';
import { getFakeReviews } from '../../../utils/mock';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';


const onFakeUnathorized = jest.fn();
const api = createAPI(onFakeUnathorized());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeReviews = getFakeReviews();

const history = createMemoryHistory();
const store = mockStore({
  USER_AUTH: {
    authStatus: AuthStatus.Auth,
  },
  REVIEWS_DATA: {
    offerReviews: fakeReviews,
    offerReviewsLoadingStatus: LoadingStatus.Succeeded,
  },
});

describe('Component: ReviewsList', () => {
  const fakeReviewsList = (
    <Provider store={store}>
      <Router history={history}>
        <ReviewsList />
      </Router>
    </Provider>);

  it('should render correctly', () => {
    const {
      getByText,
      getAllByAltText,
    } = render(fakeReviewsList);

    expect(getByText(/Reviews/i)).toBeInTheDocument();
    expect(getByText(`${fakeReviews.length.toString()}`)).toBeInTheDocument();
    expect(getByText(fakeReviews[0].comment)).toBeInTheDocument();
    expect(getByText(fakeReviews[0].user.name)).toBeInTheDocument();
    expect(getAllByAltText('Reviews avatar')[0]).toBeInTheDocument();
  });
});
