import { LoadingStatus } from '../../../const';
import { Actions, ActionType } from '../../../types/action';
import { FavoritesData } from '../../../types/state';


const initialState: FavoritesData = {
  favoriteOffers: [],
  favoriteOffersLoadingStatus: LoadingStatus.Idle,
  toggleIsFavoriteLoadingStatus: LoadingStatus.Idle,
};


const favoritesData = (state: FavoritesData = initialState, action: Actions): FavoritesData => {
  switch (action.type) {
    case ActionType.LoadFavoriteOffers:
      return {
        ...state,
        favoriteOffers: action.payload,
        favoriteOffersLoadingStatus: LoadingStatus.Succeeded,
      };
    case ActionType.ToggleIsFavorite:
      return {
        ...state,
        // currentOffer: action.payload,
      };
    case ActionType.SetToggleIsFavoriteLoadingStatus:
      return {
        ...state,
        toggleIsFavoriteLoadingStatus: action.payload,
      };
    default:
      return state;
  }

};

export { favoritesData };
