import AuthComponent from '../auth-component/auth-component';
import LocationsComponent from '../locations-component/locations-component';
import LogoComponent from '../logo-component/logo-component';
import MainMapComponent from '../main-map-component/main-map-component';
import PlaceCardComponent from '../place-card-component/place-card-component';
import PlacesSortComponent from '../places-sort-component/places-sort-component';

type MainProps = {
  offers: number;
}

function MainScreen(props: MainProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <LogoComponent />
            <AuthComponent />
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationsComponent />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{props.offers} places to stay in Amsterdam</b>
              <PlacesSortComponent />
              <div className="cities__places-list places__list tabs__content">
                <PlaceCardComponent vip/>
                <PlaceCardComponent vip={false} />
                <PlaceCardComponent vip={false} />
                <PlaceCardComponent vip />
                <PlaceCardComponent vip={false} />
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
