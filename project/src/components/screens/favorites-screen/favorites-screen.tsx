import { OfferType } from '../../../types/offer-type';
import FavoritesListComponent from '../../layout/favorites-list-component/favorites-list-component';
import FooterComponent from '../../layout/footer-component/footer-component';
import HeaderComponent from '../../layout/header-component/header-component';

type MainProps = {
  offers: OfferType[],
}

function FavoritesScreen({offers}: MainProps): JSX.Element {
// eslint-disable-next-line no-console
  console.log('received props', offers);
  return (
    <div className="page">
      <HeaderComponent renderAuth />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <FavoritesListComponent {...offers} />
        </div>
      </main>
      <FooterComponent />
    </div>
  );
}

export default FavoritesScreen;
