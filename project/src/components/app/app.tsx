import MainScreen from '../screens/main-screen/main-screen';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignInScreen from '../screens/sign-in-screen/sign-in-screen';
import FavoritesScreen from '../screens/favorites-screen/favorites-screen';
import OfferScreen from '../screens/offer-screen/offer-screen';
import NotFoundScreen from '../screens/not-found/not-found';
import { AppRoute, AuthStatus } from '../../const';
import PrivateRoute from '../routes/private-route';
import { OfferType } from '../../types/offer-type';
import { ReviewType } from '../../types/review-type';

type MainProps = {
  offersCount: number,
  offers: OfferType[],
  reviews: ReviewType[],
}

function App({offersCount, offers, reviews}: MainProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainScreen offersCount={offersCount} offers={offers} reviews={reviews}/>
        </Route>
        <Route exact path={AppRoute.SignIn}>
          <SignInScreen />
        </Route>
        <PrivateRoute exact path={AppRoute.Favorites} render={() => <FavoritesScreen offers={offers}/>} authStatus={AuthStatus.Auth}>
        </PrivateRoute>
        <Route exact path={AppRoute.Room}>
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
