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

type ParamsPropsType = {
  id: string,
}

const mapStateToProps = ({authStatus, currentOffer, isCurrentOfferLoaded, currentOfferLoadingStatus}: State) => ({
  authStatus,
  currentOffer,
  isCurrentOfferLoaded,
  currentOfferLoadingStatus,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchCurrentOffer(id: string) {
    dispatch(fetchCurrentOfferAction(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function OfferScreen({authStatus, currentOffer, isCurrentOfferLoaded, currentOfferLoadingStatus, fetchCurrentOffer}: PropsFromRedux): JSX.Element {
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

      <LoaderWrapper isLoad={isCurrentOfferLoaded} >
        <OfferContainer currentOffer={currentOffer as OfferType}/>
      </LoaderWrapper>
    </div>
  );
}

export { OfferScreen };
export default connector(OfferScreen);
