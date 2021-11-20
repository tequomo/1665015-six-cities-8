import { useParams } from 'react-router-dom';
import { Redirect } from 'react-router';
import { useEffect} from 'react';
import Header from '../../layout/header/header';
import { State } from '../../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkAppDispatch } from '../../../types/action';
import { fetchCurrentOfferAction } from '../../../services/api-actions';
import LoaderWrapper from '../../layout/loader-wrapper/loader-wrapper';
import OfferContainer from './offer-container';
import { OfferType } from '../../../types/offer-type';
import NotFoundScreen from '../not-found/not-found';
import { AppRoutes, AuthStatus, LoadingStatus } from '../../../const';
import { getAuthStatus } from '../../../store/reducers/user-auth/selectors';
import { getCurrentOffer, getCurrentOfferLoadingStatus } from '../../../store/reducers/current-offer-data/selectors';

type ParamsPropsType = {
  id: string,
}

const mapStateToProps = (state: State) => ({
  authStatus: getAuthStatus(state),
  currentOffer: getCurrentOffer(state),
  // isCurrentOfferLoaded: getIsCurrentOfferLoaded(state),
  currentOfferLoadingStatus: getCurrentOfferLoadingStatus(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchCurrentOffer(id: string) {
    dispatch(fetchCurrentOfferAction(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function OfferScreen({authStatus, currentOffer, currentOfferLoadingStatus, fetchCurrentOffer}: PropsFromRedux): JSX.Element {
  const paramsProps = useParams<ParamsPropsType>();

  useEffect(() => {
    if(authStatus === AuthStatus.NoAuth) {
      <Redirect to={AppRoutes.SignIn} />;
    }
    fetchCurrentOffer(paramsProps.id);
  }, [authStatus, fetchCurrentOffer, paramsProps.id]);

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

export { OfferScreen };
export default connector(OfferScreen);
