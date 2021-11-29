import { ClassType } from './types/classes-type';
import { SortTypes } from './types/sort';

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  SignOut = '/logout',
  Favorites = '/favorites',
  Room = '/offer/:id',
  Offer = '/offer/',
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum HttpCode {
  Ok = 200,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
}

export enum RatingName {
  'Terribly',
  'Badly',
  'Not bad',
  'Good',
  'Perfect',
}

export const CITIES: string[] = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export const DEFAULT_CITY = 'Paris';

export enum PinIconUrl {
  Default = 'img/pin.svg',
  Active = 'img/pin-active.svg',
}

export const MAX_RATING_VALUE = 5;

export enum ReviewLength {
  Min = 50,
  Max = 300,
}

export const CustomClasses: ClassType = {
  CitiesPlaces: {
    listClassName: 'cities__places-list',
    tabsClassName: 'tabs__content',
    cardClassName: 'cities__place-card',
    wrapperClassName: 'cities__image-wrapper',
    buttonClassName: 'place-card__bookmark-button--active',
  },
  NearPlaces: {
    listClassName: 'near-places__list',
    cardClassName: 'near-places__card',
    wrapperClassName: 'near-places__image-wrapper',
  },
  NoPlaces: {
    mainClassName: 'page__main--index-empty',
    divClasName: 'cities__places-container--empty',
  },
  PlacesSort: {
    listClassName: 'places__options--opened',
    itemClassName: 'places__option--active',
  },
  HeaderAuth: {
    spanAuthClassName: 'header__user-name user__name',
    spanNoAuthClassName: 'header__login',
  },
  CurrentOffer: {
    buttonFavoriteClassName: 'property__bookmark-button--active',
    divProClassName: 'property__avatar-wrapper--pro',
  },
  MainScreen: {
    mainClassName: 'page__main--index-empty',
    divCitiesClassName: 'cities__places-container--empty',
  },
  FavoritesScreen: {
    mainClassName: 'page__main--favorites-empty',
  },
  LocationsTab: {
    itemClassName: 'tabs__item--active',
  },
};

export const SortingTypes: SortTypes =  {
  DEFAULT: 'Popular',
  PRICE_UP: 'Price: low to high',
  PRICE_DOWN: 'Price: high to low',
  TOP_RATED: 'Top rated first',
};

export enum APIRoute {
    Hotels = '/hotels',
    Login = '/login',
    Logout = '/logout',
    Nearby = '/nearby',
    Favorite = '/favorite',
    Reviews = '/comments',
}

export enum LoadingStatus {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export const Messages = {
  AUTH_FAIL: 'Please enter valid email and password',
  AUTH_INFO: 'Don\'t forget to sign in',
  FAVORITE_NO_AUTH: 'You are not logged in',
  REVIEW_POST_ERROR: 'Review sending failed',
  OFFER_LOADING_ERROR: 'Offers loading failed',
};
