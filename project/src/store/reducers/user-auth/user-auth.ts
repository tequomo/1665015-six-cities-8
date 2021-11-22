import { createReducer } from '@reduxjs/toolkit';
import { AuthStatus } from '../../../const';
import { UserAuth } from '../../../types/state';
import { receiveAuthData, requireAuthorization, requireLogout } from '../../action';


const initialState: UserAuth = {
  authStatus: AuthStatus.Unknown,
  authUserData: null,
};

const userAuth = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(receiveAuthData, (state, action) => {
      state.authUserData = action.payload;
    })
    .addCase(requireLogout, (state, action) => {
      state.authStatus = AuthStatus.NoAuth;
      state.authUserData = null;
    });
});

export { userAuth };
