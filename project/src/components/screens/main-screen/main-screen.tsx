import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { CardCustomClasses } from '../../../const';
import { selectCity, selectSorting } from '../../../store/action';
import { Actions } from '../../../types/action';
import { ReviewType } from '../../../types/review-type';
import { State } from '../../../types/state';
import { getSelectedCityOffers, sortingOffers } from '../../../utils';
import Header from '../../layout/header/header';
import Locations from '../../layout/locations/locations';
import MainMap from '../../layout/main-map/main-map';
import OffersList from '../../layout/offers-list/offers-list';
import PlacesSort from '../../layout/places-sort/places-sort';
import NoPlaces from './no-places';

type MainProps = {
  reviews: ReviewType[],
  selectedCity: string,
}

const mapStateToProps = ({selectedCity, offers, currentSortingType}: State) => ({
  selectedCity,
  offers: sortingOffers(currentSortingType, getSelectedCityOffers(offers, selectedCity)),
  currentSortingType,
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


function MainScreen({offers, reviews, onMenuItemClick, selectedCity, onSelectSorting, currentSortingType}: ConnectedComponentProps): JSX.Element {

  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);

  const getActiveOfferId = (id: number | null) => {
    setSelectedOfferId(id);
  };

  return (
    <div className="page page--gray page--main">
      <Header renderAuth />

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
                <OffersList offers={offers} reviews={reviews} transferActiveOfferId={getActiveOfferId} customClasses={CardCustomClasses.CitiesPlaces}/>
              </section> :  <NoPlaces selectedCity={selectedCity} />}
            <div className="cities__right-section">
              {offers.length &&
              <section className="cities__map map">
                <MainMap city={offers[0].city} offers={offers} selectedOfferId={selectedOfferId} />
              </section>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export {MainScreen};
export default connector(MainScreen);
