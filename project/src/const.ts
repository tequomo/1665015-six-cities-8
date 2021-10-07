export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
