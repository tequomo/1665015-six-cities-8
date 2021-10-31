export type LocationType = {
  latitude: number,
  longitude: number,
  zoom: number,
}

export type CityType = {
  location: LocationType,
  name: string,
}

export type HostType = {
  avatarUrl: string,
  id: number,
  isPro: boolean,
  name: string,
}

export type BackendHostType = {
  ['avatar_url']: string,
  id: number,
  ['is_pro']: boolean,
  name: string,
}

export type OfferType = {
  bedrooms: number,
  city: CityType,
  description: string,
  goods: string[],
  host: HostType,
  id: number,
  images: string[],
  isFavorite: boolean,
  isPremium: boolean,
  location: LocationType;
  maxAdults: number,
  previewImage: string,
  price: number,
  rating: number,
  title: string,
  type: string,
}

export type BackendOfferType = {
  bedrooms: number,
  city: CityType,
  description: string,
  goods: string[],
  host: BackendHostType,
  id: number,
  images: string[],
  ['is_favorite']: boolean,
  ['is_premium']: boolean,
  location: LocationType;
  ['max_adults']: number,
  ['preview_image']: string,
  price: number,
  rating: number,
  title: string,
  type: string,
}
