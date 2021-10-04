import AuthComponent from '../auth-component/auth-component';
import LogoComponent from '../logo-component/logo-component';

type HeaderPropsType = {
  renderAuth: boolean,
}

function HeaderComponent({renderAuth}: HeaderPropsType): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <LogoComponent />
          {renderAuth && <AuthComponent />}
        </div>
      </div>
    </header>
  );
}

export default HeaderComponent;
