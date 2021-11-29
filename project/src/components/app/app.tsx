import MainScreen from '../screens/main-screen/main-screen';
import { Switch, Route } from 'react-router-dom';
import SignInScreen from '../screens/sign-in-screen/sign-in-screen';
import FavoritesScreen from '../screens/favorites-screen/favorites-screen';
import OfferScreen from '../screens/offer-screen/offer-screen';
import NotFoundScreen from '../screens/not-found/not-found';
import { AppRoute } from '../../const';
import PrivateRoute from '../routes/private-route';


function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path={AppRoute.Main}>
        <MainScreen />
      </Route>
      <Route exact path={AppRoute.SignIn}>
        <SignInScreen />
      </Route>
      <PrivateRoute exact path={AppRoute.Favorites} render={() => <FavoritesScreen />}>
      </PrivateRoute>
      <Route exact path={AppRoute.Room}>
        <OfferScreen />
      </Route>
      <Route>
        <NotFoundScreen />
      </Route>
    </Switch>
  );
}

export default App;
