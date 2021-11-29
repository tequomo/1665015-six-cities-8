import { render } from '@testing-library/react';
import { getFakeReview } from '../../../utils/mock';
import ReviewsItem from './reviews-item';

describe('Component: ReviewsItem', () => {
  const fakeReview = getFakeReview();

  it('should render correctly', () => {

    const {
      getByText,
      getAllByAltText,
    } = render(<ReviewsItem review={fakeReview}/>);

    expect(getByText(fakeReview.comment)).toBeInTheDocument();
    expect(getByText(fakeReview.user.name)).toBeInTheDocument();
    expect(getAllByAltText(/Reviews avatar/i)[0]).toBeInTheDocument();
  });

});
