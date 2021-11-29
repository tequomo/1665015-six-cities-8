import { render } from '@testing-library/react';
import GalleryItem from './gallery-item';

const PHOTO_URL = 'http://photo.link/11.jpg';

describe('Component: GalleryItem', () => {
  it('should render correctly', () => {
    const {
      getByAltText,
    } = render(
      <GalleryItem itemSource={PHOTO_URL}/>,
    );

    expect(getByAltText(/Great Housing!/i)).toBeInTheDocument();
  });

});
