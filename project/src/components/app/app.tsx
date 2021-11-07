import MainScreen from '../screens/main-screen/main-screen';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignInScreen from '../screens/sign-in-screen/sign-in-screen';
import FavoritesScreen from '../screens/favorites-screen/favorites-screen';
import OfferScreen from '../screens/offer-screen/offer-screen';
import NotFoundScreen from '../screens/not-found/not-found';
import { AppRoutes } from '../../const';
import PrivateRoute from '../routes/private-route';
import { OfferType } from '../../types/offer-type';
import { ReviewType } from '../../types/review-type';
// import { State } from '../../types/state';
// import { connect, ConnectedProps } from 'react-redux';
// import { isCheckedAuth } from '../../utils';
// import Loader from '../screens/loader/loader';

type MainProps = {
  offers: OfferType[],
  reviews: ReviewType[],
}

// const mapStateToProps = ({authStatus, isDataLoaded}: State) => ({
//   authStatus,
//   isDataLoaded,
// });

// const connector = connect(mapStateToProps);

// type PropsFromRedux = ConnectedProps<typeof connector>;
// type ConnectedComponentProps = PropsFromRedux & MainProps;

function App({offers, reviews}: MainProps): JSX.Element {
// function App({authStatus, isDataLoaded, offers, reviews}: ConnectedComponentProps): JSX.Element {

  // if (isCheckedAuth(authStatus) || !isDataLoaded) {
  //   return (
  //     <Loader />
  //   );
  // }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoutes.Main}>
          <MainScreen reviews={reviews}/>
        </Route>
        <Route exact path={AppRoutes.SignIn}>
          <SignInScreen />
        </Route>
        <PrivateRoute exact path={AppRoutes.Favorites} render={() => <FavoritesScreen offers={offers}/>}>
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

