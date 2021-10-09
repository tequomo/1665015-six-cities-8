import { OfferType } from '../../../types/offer-type';
import HeaderComponent from '../../layout/header-component/header-component';
import LocationsComponent from '../../layout/locations-component/locations-component';
import MainMapComponent from '../../layout/main-map-component/main-map-component';
import PlaceCardComponent from '../../layout/place-card-component/place-card-component';
import PlacesSortComponent from '../../layout/places-sort-component/places-sort-component';

type MainProps = {
  offersCount: number,
  offersShown: number,
  offers: OfferType[],
}

function MainScreen({offersCount, offersShown, offers}: MainProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <HeaderComponent renderAuth />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationsComponent />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in Amsterdam</b>
              <PlacesSortComponent />
              <div className="cities__places-list places__list tabs__content">
                {
                  new Array(offersShown)
                    .fill(null)
                    .map(() =>
                      <PlaceCardComponent key={Math.random()} vipOption={Math.random() > 0.5} />,
                    )
                }
              </div>
            </section>
            <div className="cities__right-section">
              <MainMapComponent />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
