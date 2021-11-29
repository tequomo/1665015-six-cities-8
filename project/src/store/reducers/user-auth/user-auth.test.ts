import { AuthStatus } from '../../../const';
import { UserAuth } from '../../../types/state';
import { getFakeAuthData } from '../../../utils/mock';
import { receiveAuthData, requireAuthorization, requireLogout } from '../../action';
import { userAuth } from './user-auth';

const state: UserAuth = {
  authStatus: AuthStatus.Unknown,
  authUserData: null,
};

const fakeAuthUserData = getFakeAuthData();

describe('Reducer: userAuth', () => {
  it('with omit parameters should return initial state', () => {
    expect(userAuth(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual(state);
  });
  it('should update authorization status to "AUTH"', () => {
    expect(userAuth(state, requireAuthorization(AuthStatus.Auth)))
      .toEqual({
        ...state,
        authStatus: AuthStatus.Auth,
      });
  });
  it('should update authorization status to "NO_AUTH" and discard user info when logout', () => {
    const initialState = {
      ...state,
      authStatus: AuthStatus.Auth,
      authUserData: fakeAuthUserData,
    };
    expect(userAuth(initialState, requireLogout))
      .toEqual({
        ...state,
        authStatus: AuthStatus.NoAuth,
        authUserData: null,
      });
  });
  it('should update state when load user auth data', () => {
    const initialState = {
      ...state,
      authStatus: AuthStatus.Auth,
    };
    expect(userAuth(initialState, receiveAuthData(fakeAuthUserData)))
      .toEqual({
        ...state,
        authStatus: AuthStatus.Auth,
        authUserData: fakeAuthUserData,
      });
  });

});
