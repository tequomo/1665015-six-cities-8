import { AuthDataResponse, AuthUserData } from '../types/auth-data';
import { BackendOfferType, OfferType } from '../types/offer-type';
import { BackendReviewType, ReviewType } from '../types/review-type';

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

export const adaptAuthDataToClient = (data: AuthDataResponse): AuthUserData => {
  const {
    'avatar_url': del1,
    'is_pro': del2,
    ...adaptedProps
  } = {
    ...data,
    avatarUrl: data['avatar_url'],
    isPro: data['is_pro'],
  };
  return adaptedProps;
};

// export const adaptReviewToClient = (data: BackendReviewType): ReviewType => {
//   const {
//     'avatar_url': del1,
//     'is_pro': del2,
//     ...adaptedUser
//   } = {
//     ...data.user,
//     avatarUrl: data.user['avatar_url'],
//     isPro: data.user['is_pro'],
//   };

//   const {
//     ...adaptedData
//   } = {
//     ...data,
//     user: {
//       ...adaptedUser,
//     },
//   };

//   return adaptedData;
// };

export const adaptReviewToClient = (data: BackendReviewType): ReviewType => ({
  comment: data.comment,
  date: data.date,
  id: data.id,
  rating: data.rating,
  user: {
    avatarUrl: data.user['avatar_url'],
    id: data.user.id,
    isPro: data.user['is_pro'],
    name: data.user.name,
  },
});

export const adaptSomeReviewsToClient = (data: BackendReviewType[]): ReviewType[] =>
  data.map((review: BackendReviewType) => (
    adaptReviewToClient(review)
  ));
