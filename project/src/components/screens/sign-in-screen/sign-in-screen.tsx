import { ThunkAppDispatch } from '../../../types/action';
import Header from '../../layout/header/header';
import { AuthDataRequest } from '../../../types/auth-data';
import { loginAction } from '../../../services/api-actions';
import { connect, ConnectedProps } from 'react-redux';
import { useRef, FormEvent, MouseEvent } from 'react';
import { useHistory } from 'react-router';
import { AppRoutes, AuthStatus, CITIES } from '../../../const';
import { State } from '../../../types/state';
import { getRandomItems } from '../../../utils';
import { selectCity } from '../../../store/action';
import { Link } from 'react-router-dom';

const CITIES_COUNT = 1;

const mapStateToProps = ({authStatus}: State) => ({
  authStatus,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onLoginFormSubmit(authData: AuthDataRequest) {
    dispatch(loginAction(authData));
  },
  onCityClick(cityName: string) {
    dispatch(selectCity(cityName));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function SignInScreen({onLoginFormSubmit, authStatus, onCityClick}: PropsFromRedux): JSX.Element {
  // const {onSubmit} = props;

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const history = useHistory();

  if(authStatus === AuthStatus.Auth) {
    history.push(AppRoutes.Main);
  }

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      onLoginFormSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
      history.push(AppRoutes.Main);
    }
  };

  const handleCityClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    onCityClick(e.currentTarget.innerText);
  };

  return (
    <div className="page page--gray page--login">
      <Header renderAuth={false} />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" ref={loginRef} type="email" name="email" placeholder="Email" required pattern="\S+@\S+\.\S+"/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" ref={passwordRef} type="password" name="password" placeholder="Password" required pattern=".+"/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to={AppRoutes.Main} className="locations__item-link" onClick={handleCityClick}>
                <span>{getRandomItems(CITIES, CITIES_COUNT)}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export { SignInScreen };
export default connector(SignInScreen);
