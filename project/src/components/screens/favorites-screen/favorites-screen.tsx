import { OfferType } from '../../../types/offer-type';
import FavoritesList from '../../layout/favorites-list/favorites-list';
import Footer from '../../layout/footer/footer';
import Header from '../../layout/header/header';

type FavoritesPropsType = {
  offers: OfferType[],
}

function FavoritesScreen({offers}: FavoritesPropsType): JSX.Element {
  return (
    <div className="page">
      <Header renderAuth />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <FavoritesList offers={offers} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesScreen;
