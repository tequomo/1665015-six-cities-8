import { memo } from 'react';
import Auth from '../auth/auth';
import Logo from '../logo/logo';

type HeaderPropsType = {
  renderAuth: boolean,
}

function Header({renderAuth}: HeaderPropsType): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          {renderAuth && <Auth />}
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
