import { Actions } from '../../../types/action';
import { useState } from 'react';
import { Dispatch } from 'redux';
import { State } from '../../../types/state';
import { getCityData, getSelectedCityOffers, sortingOffers } from '../../../utils';
import Locations from '../../layout/locations/locations';
import Map from '../../layout/map/map';
import { OffersList } from '../../layout/offers-list/offers-list';
import PlacesSort from '../../layout/places-sort/places-sort';
import NoPlaces from './no-places';
import { selectCity, selectSorting } from '../../../store/action';
import { connect, ConnectedProps } from 'react-redux';
import { CustomClasses, LoadingStatus } from '../../../const';
import { getCurrentSortingType, getSelectedCity } from '../../../store/reducers/app-state/selectors';
import { getOffers, getOffersLoadingStatus } from '../../../store/reducers/offers-data/selectors';


type MainProps = {
  selectedCity: string,
}

const mapStateToProps = (state: State) => ({
  selectedCity: getSelectedCity(state),
  offers:  sortingOffers(getCurrentSortingType(state), getSelectedCityOffers(getOffers(state), getSelectedCity(state))),
  currentSortingType: getCurrentSortingType(state),
  offersLoadingStatus: getOffersLoadingStatus(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onMenuItemClick(selectedCity: string) {
    dispatch(selectCity(selectedCity));
  },
  onSelectSorting(currentSortingType: string) {
    dispatch(selectSorting(currentSortingType));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MainProps;

function MainContainerr({offers, onMenuItemClick, selectedCity, onSelectSorting, currentSortingType, offersLoadingStatus}: ConnectedComponentProps): JSX.Element {

  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);

  const getActiveOfferId = (id: number | null) => {
    setSelectedOfferId(id);
  };

  return (
    <main className={`page__main page__main--index ${!(offersLoadingStatus === LoadingStatus.Succeeded) ? 'page__main--index-empty' : ''}`}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <Locations onMenuItemClick={onMenuItemClick} selectedCity={selectedCity} />
      </div>
      <div className="cities">
        <div className={`cities__places-container ${!(offersLoadingStatus === LoadingStatus.Succeeded) ? 'cities__places-container--empty' : ''} container`}>
          {offersLoadingStatus === LoadingStatus.Succeeded ?
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} place{offers.length > 1 ? 's' : ''} to stay in {selectedCity}</b>
              <PlacesSort onSelectSorting={onSelectSorting} currentSortingType={currentSortingType}/>
              <OffersList offers={offers} transferActiveOfferId={getActiveOfferId} customClasses={CustomClasses.CitiesPlaces} isLoad={offersLoadingStatus === LoadingStatus.Succeeded}/>
            </section> :  <NoPlaces selectedCity={selectedCity} />}
          <div className="cities__right-section">
            {(offersLoadingStatus === LoadingStatus.Succeeded) &&
              <section className="cities__map map">
                <Map city={getCityData(offers)} offers={offers} selectedOfferId={selectedOfferId} />
              </section>}
          </div>
        </div>
      </div>
    </main>
  );
}

export { MainContainerr };
export default connector(MainContainerr);
