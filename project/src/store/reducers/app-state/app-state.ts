import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY, SortingTypes } from '../../../const';
import { AppState } from '../../../types/state';
import { selectCity, selectSorting } from '../../action';


const initialState: AppState = {
  selectedCity: DEFAULT_CITY,
  currentSortingType: SortingTypes.DEFAULT,
};

const appState = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.selectedCity = action.payload;
    })
    .addCase(selectSorting, (state, action) => {
      state.currentSortingType = action.payload;
    });
});


export { appState };
