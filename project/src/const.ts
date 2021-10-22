import { CardClassType } from './types/classes-type';

export enum AppRoutes {
  Main = '/',
  SignIn = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
  Offer = '/offer/',
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum RatingNames {
  terribly,
  badly,
  notBad,
  good,
  perfect,
}

export const CITIES: string[] = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export enum PinIconUrl {
  Default = 'img/pin.svg',
  Active = 'img/pin-active.svg',
}

export const MAX_RATING_VALUE = 5;

export const CardCustomClasses: CardClassType = {
  CitiesPlaces: {
    listClassName: 'cities__places-list',
    tabsClassName: 'tabs__content',
    cardClassName: 'cities__place-card',
    wrapperClassName: 'cities__image-wrapper',
  },
  NearPlaces: {
    listClassName: 'near-places__list',
    cardClassName: 'near-places__card',
    wrapperClassName: 'near-places__image-wrapper',
  },
};
