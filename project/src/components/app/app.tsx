// import FavoritesScreen from '../favorites-screen/favorites-screen';
// import OfferScreen from '../offer-screen/offer-screen';
// import SignInScreen from '../sign-in-screen/sign-in-screen';
import MainScreen from '../main-screen/main-screen';

type MainProps = {
  offers: number;
}

function App(props: MainProps): JSX.Element {
  return (
    <MainScreen offers={props.offers}/>
  );
}

export default App;
