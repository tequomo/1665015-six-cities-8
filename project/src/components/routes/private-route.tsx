import { connect, ConnectedProps } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';
import { AppRoutes, AuthStatus } from '../../const';
import { getAuthStatus } from '../../store/reducers/user-auth/selectors';
import { State } from '../../types/state';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
  authStatus: AuthStatus;
}

const mapStateToProps = (state: State) => ({
  authStatus: getAuthStatus(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PrivateRouteProps;

function PrivateRoute({exact, path, render, authStatus}: ConnectedComponentProps): JSX.Element {
  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authStatus === AuthStatus.Auth
          ? render()
          : <Redirect to={AppRoutes.SignIn} />
      )}
    />
  );
}

export { PrivateRoute };
export default connector(PrivateRoute);
