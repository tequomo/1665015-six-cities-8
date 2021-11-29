import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';
import { AppRoute, AuthStatus } from '../../const';
import { getAuthStatus } from '../../store/reducers/user-auth/selectors';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
}

function PrivateRoute({exact, path, render}: PrivateRouteProps): JSX.Element {

  const authStatus = useSelector(getAuthStatus);

  return (
    <Route
      exact={exact}
      path={path}
      render={(renderProps) => (
        authStatus === AuthStatus.Auth
          ? render(renderProps)
          : <Redirect to={AppRoute.SignIn} />
      )}
    />
  );
}

export default PrivateRoute;
