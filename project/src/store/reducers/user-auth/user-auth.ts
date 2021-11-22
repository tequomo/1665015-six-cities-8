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

//  action: Actions): UserAuth => {
//   switch (action.type) {
//     case ActionType.RequireAuthorization:
//       return {
//         ...state,
//         authStatus: action.payload,
//       };
//     case ActionType.RequireLogout:
//       return {
//         ...state,
//         authStatus: AuthStatus.NoAuth,
//       };
//     case ActionType.ReceiveAuthData:
//       return {
//         ...state,
//         authUserData: action.payload,
//       };
//     default:
//       return state;
//   }

// };

export { userAuth };
