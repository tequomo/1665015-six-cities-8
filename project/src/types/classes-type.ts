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
}

export type NoPlacesClassType = {
  mainClassName: string,
  divClasName: string,
}
