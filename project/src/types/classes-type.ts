export type PlacesClassType = {
  listClassName: string,
  tabsClassName?: string,
  cardClassName: string,
  wrapperClassName: string,
}

export type ClassType = {
  CitiesPlaces: PlacesClassType,
  NearPlaces: PlacesClassType,
  NoPlaces: NoPlacesClassType,
  PlacesSort: PlacesSortType,
  HeaderAuth: HeaderAuthType,
  CurrentOffer: CurrentOfferType,
  MainScreen: MainScreenType,
  FavoritesScreen: FavotitesScreenType,
}

export type NoPlacesClassType = {
  mainClassName: string,
  divClasName: string,
}

export type PlacesSortType = {
  listClassName: string,
  itemClassName: string,
}

export type HeaderAuthType = {
  spanAuthClassName: string,
  spanNoAuthClassName: string,
}

export type CurrentOfferType = {
  buttonFavoriteClassName: string,
  divProClassName: string,
}

export type MainScreenType = {
  mainClassName: string,
  divCitiesClassName: string,
}

export type FavotitesScreenType = {
  mainClassName: string,
}
