import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { CardCustomClasses } from '../../../const';
import { fetchOffersAction } from '../../../services/api-actions';
import { selectCity, selectSorting } from '../../../store/action';
import { ThunkAppDispatch } from '../../../types/action';
import { ReviewType } from '../../../types/review-type';
import { State } from '../../../types/state';
import { getCityData, getSelectedCityOffers, sortingOffers } from '../../../utils';
import Header from '../../layout/header/header';
import LoaderWrapper from '../../layout/loader-wrapper/loader-wrapper';
import Locations from '../../layout/locations/locations';
import MainMap from '../../layout/main-map/main-map';
import OffersList from '../../layout/offers-list/offers-list';
import PlacesSort from '../../layout/places-sort/places-sort';
import NoPlaces from './no-places';

type MainProps = {
  reviews: ReviewType[],
  selectedCity: string,
}

const mapStateToProps = ({selectedCity, offers, currentSortingType, isDataLoaded}: State) => ({
  selectedCity,
  offers: sortingOffers(currentSortingType, getSelectedCityOffers(offers, selectedCity)),
  currentSortingType,
  isDataLoaded,
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


function MainScreen({offers, reviews, onMenuItemClick, selectedCity, onSelectSorting, currentSortingType, isDataLoaded, fetchOffers}: ConnectedComponentProps): JSX.Element {

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

      <LoaderWrapper isLoad={isDataLoaded}>
        <main className={`page__main page__main--index ${!offers.length ? 'page__main--index-empty' : ''}`}>
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <Locations onMenuItemClick={onMenuItemClick} selectedCity={selectedCity} />
          </div>
          <div className="cities">
            <div className={`cities__places-container ${!offers.length ? 'cities__places-container--empty' : ''} container`}>
              {offers.length ?
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offers.length} place{offers.length > 1 ? 's' : ''} to stay in {selectedCity}</b>
                  <PlacesSort onSelectSorting={onSelectSorting} currentSortingType={currentSortingType}/>
                  <OffersList offers={offers} reviews={reviews} transferActiveOfferId={getActiveOfferId} customClasses={CardCustomClasses.CitiesPlaces} isLoad={isDataLoaded}/>
                </section> :  <NoPlaces selectedCity={selectedCity} />}
              <div className="cities__right-section">
                {offers.length &&
              <section className="cities__map map">
                <MainMap city={getCityData(offers)} offers={offers} selectedOfferId={selectedOfferId} />
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
