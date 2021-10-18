import { OfferType } from '../../../types/offer-type';
import FavoritesListComponent from '../../layout/favorites-list-component/favorites-list-component';
import FooterComponent from '../../layout/footer-component/footer-component';
import HeaderComponent from '../../layout/header-component/header-component';

type FavoritesPropsType = {
  offers: OfferType[],
}

function FavoritesScreen({offers}: FavoritesPropsType): JSX.Element {
  return (
    <div className="page">
      <HeaderComponent renderAuth />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <FavoritesListComponent offers={offers} />
        </div>
      </main>
      <FooterComponent />
    </div>
  );
}

export default FavoritesScreen;
