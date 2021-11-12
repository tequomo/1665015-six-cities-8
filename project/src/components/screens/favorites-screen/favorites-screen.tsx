// import { OfferType } from '../../../types/offer-type';
import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { CustomClasses, LoadingStatus } from '../../../const';
import { fetchFavoriteOffersAction } from '../../../services/api-actions';
import { ThunkAppDispatch } from '../../../types/action';
import { State } from '../../../types/state';
import FavoritesEmpty from '../../layout/favorites-empty/favorites-empty';
import FavoritesList from '../../layout/favorites-list/favorites-list';
import Footer from '../../layout/footer/footer';
import Header from '../../layout/header/header';
import LoaderWrapper from '../../layout/loader-wrapper/loader-wrapper';

// type FavoritesPropsType = {
//   offers: OfferType[],
// }

const mapStateToProps = ({ favoriteOffers, favoriteOffersLoadingStatus }: State) => ({
  favoriteOffers,
  favoriteOffersLoadingStatus,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchFavoriteOffers() {
    dispatch(fetchFavoriteOffersAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;


function FavoritesScreen({ favoriteOffers, fetchFavoriteOffers, favoriteOffersLoadingStatus }: PropsFromRedux): JSX.Element {

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

export { FavoritesScreen };
export default connector(FavoritesScreen);
