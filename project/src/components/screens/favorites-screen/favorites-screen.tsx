import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomClasses, LoadingStatus } from '../../../const';
import { fetchFavoriteOffersAction } from '../../../services/api-actions';
import { getFavoriteOffers, getFavoriteOffersLoadingStatus } from '../../../store/reducers/favorites-data/selectors';
import FavoritesEmpty from '../../layout/favorites-empty/favorites-empty';
import FavoritesList from '../../layout/favorites-list/favorites-list';
import Footer from '../../layout/footer/footer';
import Header from '../../layout/header/header';
import LoaderWrapper from '../../layout/loader-wrapper/loader-wrapper';


function FavoritesScreen(): JSX.Element {

  const favoriteOffers = useSelector(getFavoriteOffers);
  const favoriteOffersLoadingStatus = useSelector(getFavoriteOffersLoadingStatus);

  const dispatch = useDispatch();

  const fetchFavoriteOffers = useCallback(() => {
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch]);

  useEffect(() => {
    fetchFavoriteOffers();
  }, [fetchFavoriteOffers]);

  return (
    <div className="page">
      <Header renderAuth />

      <LoaderWrapper isLoad={favoriteOffersLoadingStatus === LoadingStatus.Succeeded} >
        <main className={`page__main page__main--favorites ${favoriteOffers.length === 0 ? CustomClasses.FavoritesScreen.mainClassName : ''}`}>
          <div className="page__favorites-container container">
            {
              favoriteOffers.length === 0 ? <FavoritesEmpty /> : <FavoritesList favoriteOffers={favoriteOffers} />
            }
          </div>
        </main>
      </LoaderWrapper>
      <Footer />
    </div>
  );
}

export default FavoritesScreen;
