import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { CardCustomClasses } from '../../../const';
import { selectCity } from '../../../store/action';
import { Actions } from '../../../types/action';
import { OfferType } from '../../../types/offer-type';
import { ReviewType } from '../../../types/review-type';
import { State } from '../../../types/state';
import HeaderComponent from '../../layout/header-component/header-component';
import LocationsComponent from '../../layout/locations-component/locations-component';
import MainMapComponent from '../../layout/main-map-component/main-map-component';
import OffersListComponent from '../../layout/offers-list-component/offers-list-component';
import PlacesSortComponent from '../../layout/places-sort-component/places-sort-component';

type MainProps = {
  offersCount: number,
  offers: OfferType[],
  reviews: ReviewType[],
  selectedCity: string,
}

const mapStateToProps = ({selectedCity}: State) => ({
  selectedCity,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onMenuItemClick(selectedCity: string) {
    dispatch(selectCity(selectedCity));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & MainProps;

function MainScreen({offersCount, offers, reviews, onMenuItemClick, selectedCity}: ConnectedComponentProps): JSX.Element {

  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null);

  const getActiveOfferId = (id: number | null) => {
    setSelectedOfferId(id);
  };

  return (
    <div className="page page--gray page--main">
      <HeaderComponent renderAuth />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationsComponent onMenuItemClick={onMenuItemClick} selectedCity={selectedCity}/>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in Amsterdam</b>
              <PlacesSortComponent />
              <OffersListComponent offers={offers} reviews={reviews} transferActiveOfferId={getActiveOfferId} customClasses={CardCustomClasses.CitiesPlaces}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <MainMapComponent city={offers[0].city} offers={offers} selectedOfferId={selectedOfferId} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export {MainScreen};
export default connector(MainScreen);
