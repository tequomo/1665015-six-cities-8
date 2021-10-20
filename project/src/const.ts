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

export enum Cities {
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
}

export enum PinIconUrl {
  Default = 'img/pin.svg',
  Active = 'img/pin-active.svg',
}

export const MAX_RATING_VALUE = 5;
