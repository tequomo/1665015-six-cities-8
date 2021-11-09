import { useParams } from 'react-router-dom';
import { useEffect} from 'react';
import Header from '../../layout/header/header';
import { State } from '../../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkAppDispatch } from '../../../types/action';
import { fetchCurrentOfferAction } from '../../../services/api-actions';
import LoaderWrapper from '../../layout/loader-wrapper/loader-wrapper';
import OfferContainer from './offer-container';
import { OfferType } from '../../../types/offer-type';

type ParamsPropsType = {
  id: string,
}

const mapStateToProps = ({currentOffer, isCurrentOfferLoaded}: State) => ({
  currentOffer,
  isCurrentOfferLoaded,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchCurrentOffer(id: string) {
    dispatch(fetchCurrentOfferAction(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function OfferScreen({currentOffer, isCurrentOfferLoaded, fetchCurrentOffer}: PropsFromRedux): JSX.Element {
  const paramsProps = useParams<ParamsPropsType>();

  useEffect(() => {
    fetchCurrentOffer(paramsProps.id);
  }, [fetchCurrentOffer, paramsProps.id]);


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
