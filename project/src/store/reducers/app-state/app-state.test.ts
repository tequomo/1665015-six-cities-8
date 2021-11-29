import { DEFAULT_CITY, SortingTypes } from '../../../const';
import { appState } from './app-state';
import { address, datatype } from 'faker';
import { selectCity, selectSorting } from '../../action';
import { AppState } from '../../../types/state';

const state: AppState = {
  selectedCity: DEFAULT_CITY,
  currentSortingType: SortingTypes.DEFAULT,
};

describe('Reducer: appState', () => {

  it('should change city by a given value', () => {
    const anotherCity = address.cityName();
    expect(appState(state, selectCity(anotherCity)))
      .toEqual({ selectedCity: anotherCity, currentSortingType: SortingTypes.DEFAULT});
  });

  it('should change sorting by a given value', () => {
    const anotherSorting = datatype.string();
    expect(appState(state, selectSorting(anotherSorting)))
      .toEqual({ selectedCity: DEFAULT_CITY, currentSortingType: anotherSorting});
  });

  it('with omit parameters should return initial state', () => {
    expect(appState(void 0, {type: 'UNKNOWN_TYPE'}))
      .toEqual({ selectedCity: DEFAULT_CITY, currentSortingType: SortingTypes.DEFAULT });
  });

});
