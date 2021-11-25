import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, AuthStatus, CustomClasses } from '../../../const';
import { logoutAction } from '../../../services/api-actions';
import { getAuthStatus, getAuthUserData } from '../../../store/reducers/user-auth/selectors';
import SignOutBlock from './signout-block';


function Auth(): JSX.Element {

  const authStatus = useSelector(getAuthStatus);
  const authUserData = useSelector(getAuthUserData);

  const dispatch = useDispatch();

  const doSignOut = () => {
    dispatch(logoutAction());
  };

  const isAuth = authStatus === AuthStatus.Auth;

  const handleSignOut = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    doSignOut();
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={isAuth ? AppRoute.Favorites : AppRoute.SignIn}>
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

export default Auth;
