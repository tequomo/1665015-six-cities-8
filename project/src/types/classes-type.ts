export type PlacesClassType = {
  listClassName: string,
  tabsClassName?: string,
  cardClassName: string,
  wrapperClassName: string,
}

export type CardClassType = {
  CitiesPlaces: PlacesClassType,
  NearPlaces: PlacesClassType,
  NoPlaces: NoPlacesClassType,
  PlacesSort: PlacesSortType,
  HeaderAuth: HeaderAuthType,
  CurrentOffer: CurrentOfferType,
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
