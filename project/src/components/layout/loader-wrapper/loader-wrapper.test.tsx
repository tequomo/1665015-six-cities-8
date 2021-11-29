import { render } from '@testing-library/react';
import LoaderWrapper from './loader-wrapper';

describe('Component: LoaderWrapper', () => {
  it('should render Loader correctly', () => {
    const {
      queryByText,
      getByTestId,
    } = render(
      <LoaderWrapper isLoad={false} >
        <h1>This is a children element</h1>
      </LoaderWrapper>,
    );

    expect(queryByText(/This is a children element/i)).not.toBeInTheDocument();
    expect(getByTestId('loader')).toBeInTheDocument();
  });

  it('should render children element correctly', () => {
    const {
      getByText,
      queryByTestId,
    } = render(
      <LoaderWrapper isLoad >
        <h1>This is a children element</h1>
      </LoaderWrapper>,
    );

    expect(getByText(/This is a children element/i)).toBeInTheDocument();
    expect(queryByTestId('loader')).not.toBeInTheDocument();
  });
});
