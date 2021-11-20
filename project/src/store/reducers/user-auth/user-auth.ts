import { AuthStatus } from '../../../const';
import { Actions, ActionType } from '../../../types/action';
import { UserAuth } from '../../../types/state';


const initialState: UserAuth = {
  authStatus: AuthStatus.Unknown,
  authUserData: null,
};

const userAuth = (state: UserAuth = initialState, action: Actions): UserAuth => {
  switch (action.type) {
    case ActionType.RequireAuthorization:
      return {
        ...state,
        authStatus: action.payload,
      };
    case ActionType.RequireLogout:
      return {
        ...state,
        authStatus: AuthStatus.NoAuth,
      };
    case ActionType.ReceiveAuthData:
      return {
        ...state,
        authUserData: action.payload,
      };
    default:
      return state;
  }

};

export { userAuth };
