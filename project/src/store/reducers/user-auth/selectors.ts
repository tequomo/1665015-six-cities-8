import { AuthStatus } from '../../../const';
import { AuthUserData } from '../../../types/auth-data';
import { State } from '../../../types/state';
import { NameSpace } from '../root-reducer';


export const getAuthStatus = (state: State): AuthStatus => state[NameSpace.auth].authStatus;
export const getAuthUserData = (state: State): AuthUserData | null => state[NameSpace.auth].authUserData;
