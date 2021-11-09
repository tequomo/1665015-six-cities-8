import { APIRoutes, AuthStatus, LoadingStatus } from '../const';
import { loadCurrentOffer, loadNearbyOffers, loadOffers, receiveAuthData, requireAuthorization, requireLogout, setCurrentOfferLoadingStatus } from '../store/action';
import { ThunkActionResult } from '../types/action';
import { AuthDataRequest, AuthDataResponse } from '../types/auth-data';
import { BackendOfferType } from '../types/offer-type';
import { adaptSingleToClient, adaptMultipleToClient, adaptAuthDataToClient } from './adapter';
import { dropToken, saveToken } from './token';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<BackendOfferType[]>(APIRoutes.Hotels);
    dispatch(loadOffers(adaptMultipleToClient(data)));
  };

export const fetchCurrentOfferAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<BackendOfferType>(`${APIRoutes.Hotels}/${id}`);
      dispatch(loadCurrentOffer(adaptSingleToClient(data)));
    } catch {
      dispatch(setCurrentOfferLoadingStatus(LoadingStatus.Failed));
    }
  };

export const fetchNearbyOffersAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<BackendOfferType[]>(`${APIRoutes.Hotels}/${id}${APIRoutes.Nearby}`);
    dispatch(loadNearbyOffers(adaptMultipleToClient(data)));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get<AuthDataResponse>(APIRoutes.Login)
      .then(({ data }) => {
        if(!data) {
          dispatch(requireAuthorization(AuthStatus.NoAuth));
          return;
        }
        dispatch(requireAuthorization(AuthStatus.Auth));
        dispatch(receiveAuthData(adaptAuthDataToClient(data)));
      });
  };

export const loginAction = ({login: email, password}: AuthDataRequest): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.post<AuthDataResponse>(APIRoutes.Login, {email, password});
    saveToken(data.token);
    dispatch(requireAuthorization(AuthStatus.Auth));
    dispatch(receiveAuthData(adaptAuthDataToClient(data)));
  };


export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoutes.Logout);
    dropToken();
    dispatch(requireLogout());
  };
