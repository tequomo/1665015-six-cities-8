import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { CustomClasses, LoadingStatus } from '../../../const';
import { fetchOffersAction } from '../../../services/api-actions';
import { selectCity, selectSorting } from '../../../store/action';
import { getSelectedCity, getCurrentSortingType } from '../../../store/reducers/app-state/selectors';
import { getOffers, getOffersLoadingStatus } from '../../../store/reducers/offers-data/selectors';
import { ThunkAppDispatch } from '../../../types/action';
import { State } from '../../../types/state';
import { getCityData, getSelectedCityOffers, sortingOffers } from '../../../utils';
import Header from '../../layout/header/header';
import LoaderWrapper from '../../layout/loader-wrapper/loader-wrapper';
import Locations from '../../layout/locations/locations';
import Map from '../../layout/map/map';
import OffersList from '../../layout/offers-list/offers-list';
import PlacesSort from '../../layout/places-sort/places-sort';
import NoPlaces from './no-places';


type MainProps = {
  selectedCity: string,
}

const mapStateToProps = (state: State) => ({
  selectedCity: getSelectedCity(state),
  offers:  sortingOffers(getCurrentSortingType(state), getSelectedCityOffers(getOffers(state), getSelectedCity(state))),
  currentSortingType: getCurrentSortingType(state),
  offersLoadingStatus: getOffersLoadingStatus(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onMenuItemClick(selectedCity: string) {
    dispatch(selectCity(selectedCity));
  },
  onSelectSorting(currentSortingType: string) {
    dispatch(selectSorting(currentSortingType));
  },
  fetchOffers() {
    dispatch(fetchOffersAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MainProps;


function MainScreen({offers, onMenuItemClick, selectedCity, onSelectSorting, currentSortingType, offersLoadingStatus, fetchOffers}: ConnectedComponentProps): JSX.Element {

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);

  const getActiveOfferId = (id: number | null) => {
    setSelectedOfferId(id);
  };

  return (
    <div className="page page--gray page--main">
      <Header renderAuth />

      <LoaderWrapper isLoad={offersLoadingStatus === LoadingStatus.Succeeded}>
        <main className={`page__main page__main--index ${!offers.length ? CustomClasses.MainScreen.mainClassName : ''}`}>
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <Locations onMenuItemClick={onMenuItemClick} selectedCity={selectedCity} />
          </div>
          <div className="cities">
            <div className={`cities__places-container ${!offers.length ? CustomClasses.MainScreen.divCitiesClassName : ''} container`}>
              {offers.length ?
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offers.length} place{offers.length > 1 ? 's' : ''} to stay in {selectedCity}</b>
                  <PlacesSort onSelectSorting={onSelectSorting} currentSortingType={currentSortingType}/>
                  <OffersList offers={offers} transferActiveOfferId={getActiveOfferId} customClasses={CustomClasses.CitiesPlaces} isLoad={offersLoadingStatus === LoadingStatus.Succeeded}/>
                </section> :  <NoPlaces selectedCity={selectedCity} />}
              <div className="cities__right-section">
                {offers.length &&
              <section className="cities__map map">
                <Map city={getCityData(offers)} offers={offers} selectedOfferId={selectedOfferId} />
              </section>}
              </div>
            </div>
          </div>
        </main>
      </LoaderWrapper>
    </div>
  );
}

export {MainScreen};
export default connector(MainScreen);
