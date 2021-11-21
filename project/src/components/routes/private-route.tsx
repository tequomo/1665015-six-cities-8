import { useDispatch, useSelector } from 'react-redux';
import { Route, RouteProps } from 'react-router';
import { AppRoutes, AuthStatus } from '../../const';
import { redirectToRoute } from '../../store/action';
import { getAuthStatus } from '../../store/reducers/user-auth/selectors';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
}

function PrivateRoute({exact, path, render}: PrivateRouteProps): JSX.Element {

  const authStatus = useSelector(getAuthStatus);

  const dispatch = useDispatch();

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authStatus === AuthStatus.Auth
          ? render()
          : dispatch(redirectToRoute(AppRoutes.SignIn))
      )}
    />
  );
}

export default PrivateRoute;
