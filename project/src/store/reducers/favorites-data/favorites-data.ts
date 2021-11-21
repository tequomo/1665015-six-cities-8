import { createReducer } from '@reduxjs/toolkit';
import { LoadingStatus } from '../../../const';
import { FavoritesData } from '../../../types/state';
import { updateFavoritesList } from '../../../utils';
import { loadFavoriteOffers, setFavoriteOffersLoadingStatus, setToggleIsFavoriteLoadingStatus, updateOffer } from '../../action';


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
    .addCase(updateOffer, (state, action) => {
      state.favoriteOffers = updateFavoritesList(state.favoriteOffers, action.payload);
    })
    .addCase(setToggleIsFavoriteLoadingStatus, (state, action) => {
      state.toggleIsFavoriteLoadingStatus = action.payload;
    });
});

export { favoritesData };
