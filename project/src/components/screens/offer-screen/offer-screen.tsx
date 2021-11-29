import { useParams } from 'react-router-dom';
import { Redirect } from 'react-router';
import { useCallback, useEffect} from 'react';
import Header from '../../layout/header/header';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentOfferAction } from '../../../services/api-actions';
import LoaderWrapper from '../../layout/loader-wrapper/loader-wrapper';
import OfferContainer from './offer-container';
import { OfferType } from '../../../types/offer-type';
import NotFoundScreen from '../not-found/not-found';
import { AppRoute, AuthStatus, LoadingStatus } from '../../../const';
import { getAuthStatus } from '../../../store/reducers/user-auth/selectors';
import { getCurrentOffer, getCurrentOfferLoadingStatus } from '../../../store/reducers/current-offer-data/selectors';

type ParamsPropsType = {
  id: string,
}

function OfferScreen(): JSX.Element {
  const paramsProps = useParams<ParamsPropsType>();

  const authStatus = useSelector(getAuthStatus);
  const currentOffer = useSelector(getCurrentOffer);
  const currentOfferLoadingStatus = useSelector(getCurrentOfferLoadingStatus);

  const dispatch = useDispatch();

  const fetchCurrentOffer = useCallback((id: string) => {
    dispatch(fetchCurrentOfferAction(paramsProps.id));
  }, [dispatch, paramsProps.id]);

  useEffect(() => {
    fetchCurrentOffer(paramsProps.id);
  }, [fetchCurrentOffer, paramsProps.id]);

  useEffect(() => {
    if(authStatus === AuthStatus.NoAuth) {
      <Redirect to={AppRoute.SignIn} />;
    }
  }, [authStatus]);

  if(currentOfferLoadingStatus === LoadingStatus.Failed) {
    return <NotFoundScreen />;
  }

  return (
    <div className="page">
      <Header renderAuth />

      <LoaderWrapper isLoad={currentOfferLoadingStatus === LoadingStatus.Succeeded} >
        <OfferContainer currentOffer={currentOffer as OfferType}/>
      </LoaderWrapper>
    </div>
  );
}

export default OfferScreen;
