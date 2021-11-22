import MainScreen from '../screens/main-screen/main-screen';
import { Router as BrowserRouter, Switch, Route } from 'react-router-dom';
import SignInScreen from '../screens/sign-in-screen/sign-in-screen';
import FavoritesScreen from '../screens/favorites-screen/favorites-screen';
import OfferScreen from '../screens/offer-screen/offer-screen';
import NotFoundScreen from '../screens/not-found/not-found';
import { AppRoutes } from '../../const';
import PrivateRoute from '../routes/private-route';
import browserHistory from '../../browser-history';


function App(): JSX.Element {
  return (
    <BrowserRouter history={browserHistory}>
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

export default App;
