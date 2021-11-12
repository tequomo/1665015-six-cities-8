import MainScreen from '../screens/main-screen/main-screen';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignInScreen from '../screens/sign-in-screen/sign-in-screen';
import FavoritesScreen from '../screens/favorites-screen/favorites-screen';
import OfferScreen from '../screens/offer-screen/offer-screen';
import NotFoundScreen from '../screens/not-found/not-found';
import { AppRoutes } from '../../const';
import PrivateRoute from '../routes/private-route';
// import { OfferType } from '../../types/offer-type';
// import { ReviewType } from '../../types/review-type';

// type MainProps = {
//   offers: OfferType[],
//   reviews: ReviewType[],
// }

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoutes.Main}>
          <MainScreen />
        </Route>
        <Route exact path={AppRoutes.SignIn}>
          <SignInScreen />
        </Route>
        <PrivateRoute exact path={AppRoutes.Favorites} render={() => <FavoritesScreen />}>
        </PrivateRoute>
        <Route exact path={AppRoutes.Room}>
          <OfferScreen />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

// export { App };
// export default connector(App);
export default App;

