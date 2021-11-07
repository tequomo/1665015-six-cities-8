import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../const';

type SignOutBlockProps = {
  handleSignOut: (e: MouseEvent<HTMLAnchorElement>) => void,
}

function SignOutBlock({handleSignOut}: SignOutBlockProps): JSX.Element {
  return (
    <li className="header__nav-item">
      <Link className="header__nav-link" to={AppRoutes.SignOut} onClick={handleSignOut}>
        <span className="header__signout">Sign out</span>
      </Link>
    </li>
  );
}

export default SignOutBlock;
