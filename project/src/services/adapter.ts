import { BackendOfferType, OfferType } from '../types/offer-type';

export const adaptSingleToClient = (offer: BackendOfferType): OfferType => (
  {
    bedrooms: offer.bedrooms,
    city: offer.city,
    description: offer.description,
    goods: offer.goods,
    host: {
      avatarUrl: offer.host['avatar_url'],
      id: offer.host.id,
      isPro: offer.host['is_pro'],
      name: offer.host.name,
    },
    id: offer.id,
    images: offer.images,
    isFavorite: offer['is_favorite'],
    isPremium: offer['is_premium'],
    location: offer.location,
    maxAdults: offer['max_adults'],
    previewImage: offer['preview_image'],
    price: offer.price,
    rating: offer.rating,
    title: offer.title,
    type: offer.type,
  }
);

export const adaptMultipleToClient = (data: BackendOfferType[]): OfferType[] =>
  data.map((offer: BackendOfferType) => (
    adaptSingleToClient(offer)
  ));
