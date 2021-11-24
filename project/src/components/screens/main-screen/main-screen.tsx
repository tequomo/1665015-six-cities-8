import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomClasses, LoadingStatus } from '../../../const';
import { fetchOffersAction } from '../../../services/api-actions';
import { selectCity, selectSorting } from '../../../store/action';
import { getSelectedCity, getCurrentSortingType } from '../../../store/reducers/app-state/selectors';
import { getOffersLoadingStatus, getSortedOffers } from '../../../store/reducers/offers-data/selectors';
import Header from '../../layout/header/header';
import LoaderWrapper from '../../layout/loader-wrapper/loader-wrapper';
import Locations from '../../layout/locations/locations';
import Map from '../../layout/map/map';
import OffersList from '../../layout/offers-list/offers-list';
import PlacesSort from '../../layout/places-sort/places-sort';
import NoPlaces from './no-places';


function MainScreen(): JSX.Element {

  const offers = useSelector(getSortedOffers);
  const selectedCity = useSelector(getSelectedCity);
  const currentSortingType = useSelector(getCurrentSortingType);
  const offersLoadingStatus = useSelector(getOffersLoadingStatus);

  const dispatch = useDispatch();

  const onMenuItemClick = (city: string) => {
    dispatch(selectCity(city));
  };
  const onSelectSorting = (currentSorting: string) => {
    dispatch(selectSorting(currentSorting));
  };
  const fetchOffers = useCallback(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

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
        <main className={`page__main page__main--index ${!(offersLoadingStatus === LoadingStatus.Succeeded) ? CustomClasses.MainScreen.mainClassName : ''}`}>
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <Locations onMenuItemClick={onMenuItemClick} selectedCity={selectedCity} />
          </div>
          <div className="cities">
            <div className={`cities__places-container ${!(offersLoadingStatus === LoadingStatus.Succeeded) ? CustomClasses.MainScreen.divCitiesClassName : ''} container`}>
              {offers.length ?
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offers.length} place{offers.length > 1 ? 's' : ''} to stay in {selectedCity}</b>
                  <PlacesSort onSelectSorting={onSelectSorting} currentSortingType={currentSortingType}/>
                  <LoaderWrapper isLoad={offersLoadingStatus === LoadingStatus.Succeeded}>
                    <OffersList offers={offers} transferActiveOfferId={getActiveOfferId} customClasses={CustomClasses.CitiesPlaces} />
                  </LoaderWrapper>
                </section> :  <NoPlaces selectedCity={selectedCity} />}
              <div className="cities__right-section">
                {(offersLoadingStatus === LoadingStatus.Succeeded) &&
              <section className="cities__map map">
                <Map offers={offers} selectedOfferId={selectedOfferId} />
              </section>}
              </div>
            </div>
          </div>
        </main>
      </LoaderWrapper>
    </div>
  );
}

export default MainScreen;
