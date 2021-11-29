import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';

type SignOutBlockProps = {
  onSignOut: (e: MouseEvent<HTMLAnchorElement>) => void,
}

function SignOutBlock({onSignOut}: SignOutBlockProps): JSX.Element {
  return (
    <li className="header__nav-item">
      <Link className="header__nav-link" to={AppRoute.SignOut} onClick={onSignOut}>
        <span className="header__signout">Sign out</span>
      </Link>
    </li>
  );
}

export default SignOutBlock;
