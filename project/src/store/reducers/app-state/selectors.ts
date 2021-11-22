import { State } from '../../../types/state';
import { NameSpace } from '../root-reducer';

export const getSelectedCity = (state: State): string => state[NameSpace.state].selectedCity;
export const getCurrentSortingType = (state: State): string => state[NameSpace.state].currentSortingType;
