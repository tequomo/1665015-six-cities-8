type GalleryItemPropsType = {
  itemSource: string,
}

function GalleryItem({itemSource}: GalleryItemPropsType): JSX.Element {
  return (
    <div className="property__image-wrapper">
      <img className="property__image" src={itemSource} alt="Great Housing!" />
    </div>
  );
}

export default GalleryItem;
