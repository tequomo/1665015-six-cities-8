import { createReducer } from '@reduxjs/toolkit';
import { LoadingStatus } from '../../../const';
import { FavoritesData } from '../../../types/state';
import { loadFavoriteOffers, setFavoriteOffersLoadingStatus, setToggleIsFavoriteLoadingStatus } from '../../action';


const initialState: FavoritesData = {
  favoriteOffers: [],
  favoriteOffersLoadingStatus: LoadingStatus.Idle,
  toggleIsFavoriteLoadingStatus: LoadingStatus.Idle,
};


const favoritesData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload;
    })
    .addCase(setFavoriteOffersLoadingStatus, (state, action) => {
      state.favoriteOffersLoadingStatus = action.payload;
    })
  // .addCase(toggleIsFavorite, (state, action) => {
  //   state.
  // })
    .addCase(setToggleIsFavoriteLoadingStatus, (state, action) => {
      state.toggleIsFavoriteLoadingStatus = action.payload;
    });
});

// const favoritesData = (state: FavoritesData = , action: Actions): FavoritesData => {
//   switch (action.type) {
//     case ActionType.LoadFavoriteOffers:
//       return {
//         ...state,
//         favoriteOffers: action.payload,
//         favoriteOffersLoadingStatus: LoadingStatus.Succeeded,
//       };
//     case ActionType.ToggleIsFavorite:
//       return {
//         ...state,
//         // currentOffer: action.payload,
//       };
//     case ActionType.SetToggleIsFavoriteLoadingStatus:
//       return {
//         ...state,
//         toggleIsFavoriteLoadingStatus: action.payload,
//       };
//     default:
//       return state;
//   }

// };

export { favoritesData };
