import { BackendOfferType, OfferType } from '../types/offer-type';


export const adaptToClient = (data: BackendOfferType[]): OfferType[] =>
  data.map((offer: BackendOfferType) => {
    const {
      'is_favorite': del1,
      'is_premium': del2,
      'max_adults': del3,
      'preview_image': del4,
      ...adaptedProperties
    } = {
      ...offer,
      host: {
        ...offer.host,
        isPro: offer.host['is_pro'],
        avatarUrl: offer.host['avatar_url'],
      },
      isFavorite: offer['is_favorite'],
      isPremium: offer['is_premium'],
      maxAdults: offer['max_adults'],
      previewImage: offer['preview_image'],
    };

    // delete adaptedOffers.host['avatar_url'];
    // delete adaptedOffers.host['is_pro'];

    return adaptedProperties;
  });
