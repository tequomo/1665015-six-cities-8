import { render } from '@testing-library/react';
import { internet } from 'faker';
import { generateFakeList } from '../../../utils/mock';
import InteriorGallery from './interior-gallery';

const PHOTO_ALBUM = generateFakeList(internet.url);

describe('Component: InteriorGallery', () => {
  it('should render correctly', () => {
    const {
      getAllByAltText,
    } = render(
      <InteriorGallery galleryItems={PHOTO_ALBUM}/>,
    );

    const links = getAllByAltText(/Great Housing!/i);

    expect(links[0]).toBeInTheDocument();
    expect(links).toHaveLength(6);
  });

});
