import MainScreen from '../screens/main-screen/main-screen';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignInScreen from '../screens/sign-in-screen/sign-in-screen';
import FavoritesScreen from '../screens/favorites-screen/favorites-screen';
import OfferScreen from '../screens/offer-screen/offer-screen';
import NotFoundScreen from '../screens/not-found/not-found';
import { AppRoutes, AuthStatus } from '../../const';
import PrivateRoute from '../routes/private-route';
import { OfferType } from '../../types/offer-type';
import { ReviewType } from '../../types/review-type';

type MainProps = {
  offers: OfferType[],
  reviews: ReviewType[],
}

function App({offers, reviews}: MainProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoutes.Main}>
          <MainScreen reviews={reviews}/>
        </Route>
        <Route exact path={AppRoutes.SignIn}>
          <SignInScreen />
        </Route>
        <PrivateRoute exact path={AppRoutes.Favorites} render={() => <FavoritesScreen offers={offers}/>} authStatus={AuthStatus.Auth}>
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
