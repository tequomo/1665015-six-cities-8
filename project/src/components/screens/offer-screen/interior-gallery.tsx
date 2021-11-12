import GalleryItem from './gallery-item';

type GalleryPropsType = {
  galleryItems: string[],
}

function InteriorGallery({galleryItems}: GalleryPropsType): JSX.Element {
  return (
    <div className="property__gallery">
      {
        galleryItems.map((itemSource) => <GalleryItem key={itemSource} itemSource={itemSource} />)
      }
    </div>
  );
}

export default InteriorGallery;
