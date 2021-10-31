import { APIRoutes, AuthStatus } from '../const';
import { loadOffers, requireAuthorization, requireLogout } from '../store/action';
import { ThunkActionResult } from '../types/action';
import { AuthData } from '../types/auth-data';
import { OfferType } from '../types/offer-type';
import { dropToken, saveToken, Token } from './token';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OfferType[]>(APIRoutes.Hotels);
    dispatch(loadOffers(data));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoutes.Login)
      .then(() => {
        dispatch(requireAuthorization(AuthStatus.Auth));
      });
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(APIRoutes.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthStatus.Auth));
  };


export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoutes.Logout);
    dropToken();
    dispatch(requireLogout());
  };
