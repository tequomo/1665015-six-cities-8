import { MouseEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoutes, AuthStatus, CustomClasses } from '../../../const';
import { logoutAction } from '../../../services/api-actions';
import { getAuthStatus, getAuthUserData } from '../../../store/reducers/user-auth/selectors';
import { ThunkAppDispatch } from '../../../types/action';
import { State } from '../../../types/state';
import SignOutBlock from './signout-block';

const mapStateToProps = (state: State) => ({
  authStatus: getAuthStatus(state),
  authUserData: getAuthUserData(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSignOutClick() {
    dispatch(logoutAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Auth({authStatus, authUserData, onSignOutClick}: PropsFromRedux): JSX.Element {

  const isAuth = authStatus === AuthStatus.Auth;

  const handleSignOut = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onSignOutClick();
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={isAuth ? AppRoutes.Favorites : AppRoutes.SignIn}>
            <div className="header__avatar-wrapper user__avatar-wrapper" style={isAuth ? {backgroundImage: `url(${authUserData?.avatarUrl})`, borderRadius: '50%'} : {}}>
            </div>
            <span className={isAuth ? CustomClasses.HeaderAuth.spanAuthClassName : CustomClasses.HeaderAuth.spanNoAuthClassName}>{isAuth ? authUserData?.email : 'Sign in'}</span>
          </Link>
        </li>
        {
          isAuth && <SignOutBlock handleSignOut={handleSignOut} />
        }
      </ul>
    </nav>
  );
}

export { Auth };
export default connector(Auth);
