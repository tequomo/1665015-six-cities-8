import { BackendHostType, BackendOfferType, CityType, HostType, LocationType, OfferType } from '../types/offer-type';
import { datatype, lorem, system, address, internet, name } from 'faker';
import { AuthUserData, AuthDataResponse, AuthDataRequest } from '../types/auth-data';
import { BackendReviewType, PostReviewType, ReviewType } from '../types/review-type';
import { AuthStatus, LoadingStatus, SortingTypes } from '../const';
import { State } from '../types/state';

const FAKE_ITEMS_COUNT = 6;

export const getFakeLocation = (): LocationType => ({
  latitude: Number(address.latitude()),
  longitude: Number(address.longitude()),
  zoom: datatype.number(),
});

export const getFakeCity = (): CityType => ({
  name: address.city(),
  location: getFakeLocation(),
});

const getFakeHost = (): HostType => ({
  avatarUrl: internet.avatar(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: name.firstName(),
});

const getFakeBackendHost = (): BackendHostType => ({
  'avatar_url': internet.avatar(),
  id: datatype.number(),
  'is_pro': datatype.boolean(),
  name: name.firstName(),
});

type FakerActionType = () => string;

export const generateFakeList = (fakerAction: FakerActionType): string[] => new Array(FAKE_ITEMS_COUNT).fill(null).map(() => fakerAction());

export const getFakeOffer = (): OfferType => ({
  bedrooms: datatype.number(),
  city: getFakeCity(),
  description: lorem.paragraph(),
  goods: generateFakeList(datatype.string),
  host: getFakeHost(),
  id: datatype.number(),
  images: generateFakeList(system.filePath),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: getFakeLocation(),
  maxAdults: datatype.number(),
  previewImage: system.filePath(),
  price: datatype.number(),
  rating: datatype.number(),
  title: datatype.string(),
  type: lorem.word(),
});

export const getFakeBackendOffer = (): BackendOfferType => {
  const {
    isFavorite: del1,
    isPremium: del2,
    maxAdults: del3,
    previewImage: del4,
    ...restParams
  } = {
    ...getFakeOffer(),
    host: getFakeBackendHost(),
    'is_favorite': datatype.boolean(),
    'is_premium': datatype.boolean(),
    'max_adults': datatype.number(),
    'preview_image': system.filePath(),
  };
  return restParams;
};


export const getFakeOffers = (): OfferType[] => (
  new Array(FAKE_ITEMS_COUNT).fill(null).map(getFakeOffer)
);

export const getFakeBackendOffers = (): BackendOfferType[] => (
  new Array(FAKE_ITEMS_COUNT).fill(null).map(getFakeBackendOffer)
);

export const getFakeAuthData = (): AuthUserData => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: name.firstName(),
  token: datatype.string(),
});

export const getFakeAuthDataResponse = (): AuthDataResponse => {
  const {
    avatarUrl: del1,
    isPro: del2,
    ...restParams
  } = {
    ...getFakeAuthData(),
    'avatar_url': internet.avatar(),
    'is_pro': datatype.boolean(),
  };
  return restParams;
};

export const getFakeAuthDataRequest = (): AuthDataRequest => ({
  login: internet.email(),
  password: internet.password(),
});

export const getFakeReview = (): ReviewType => ({
  comment: datatype.string(),
  date: datatype.datetime().toString(),
  id: datatype.number(),
  rating: datatype.number(),
  user: getFakeHost(),
});

export const getFakeReviews = (): ReviewType[] => (
  new Array(FAKE_ITEMS_COUNT).fill(null).map(getFakeReview)
);

export const getFakeBackendReview = (): BackendReviewType => ({
  ...getFakeReview(),
  user: getFakeBackendHost(),
});

export const getFakePostReview = (): PostReviewType => ({
  comment: datatype.string(),
  rating: datatype.number(),
});

export const getFakeBackendReviews = (): BackendReviewType[] => (
  new Array(FAKE_ITEMS_COUNT).fill(null).map(getFakeBackendReview)
);

const fakeOffer = getFakeOffer();

export const getFakeStore = (authStatus: AuthStatus): State => ({
  OFFERS_DATA: {
    offers: [fakeOffer],
    offersLoadingStatus: LoadingStatus.Succeeded,
  },
  CURRENT_OFFER_DATA: {
    currentOffer: fakeOffer,
    currentOfferLoadingStatus: LoadingStatus.Succeeded,
  },
  REVIEWS_DATA: {
    offerReviews: [],
    offerReviewsLoadingStatus: LoadingStatus.Succeeded,
    reviewLoadingStatus: LoadingStatus.Idle,
  },
  NEARBY_DATA: {
    nearbyOffers: [fakeOffer],
    nearbyOffersLoadingStatus: LoadingStatus.Succeeded,
  },
  FAVORITES_DATA: {
    favoriteOffers: [fakeOffer],
    favoriteOffersLoadingStatus: LoadingStatus.Succeeded,
    toggleIsFavoriteLoadingStatus: LoadingStatus.Succeeded,
  },
  USER_AUTH: {
    authStatus: authStatus,
    authUserData: null,
  },
  STATE: {
    selectedCity: fakeOffer.city.name,
    currentSortingType: SortingTypes.DEFAULT,
  },
});
