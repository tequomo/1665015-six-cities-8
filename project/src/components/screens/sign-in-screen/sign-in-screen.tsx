import Header from '../../layout/header/header';
import { AuthDataRequest } from '../../../types/auth-data';
import { loginAction } from '../../../services/api-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, FormEvent, MouseEvent } from 'react';
import { AppRoutes, AuthStatus, CITIES } from '../../../const';
import { getRandomItems, validateLogin, validatePassword } from '../../../utils/utils';
import { selectCity } from '../../../store/action';
import { Link, Redirect } from 'react-router-dom';
import { getAuthStatus } from '../../../store/reducers/user-auth/selectors';

const CITIES_COUNT = 1;

function SignInScreen(): JSX.Element {

  const authStatus = useSelector(getAuthStatus);
  const isAuth = authStatus === AuthStatus.Auth;

  const dispatch = useDispatch();

  const onLoginFormSubmit = (authData: AuthDataRequest) => {
    dispatch(loginAction(authData));
  };
  const onCityClick = (cityName: string) => {
    dispatch(selectCity(cityName));
  };

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleLoginChange = (evt: FormEvent<HTMLInputElement>) => {
    if (loginRef.current) {
      loginRef.current.setCustomValidity(
        validateLogin(loginRef.current.value),
      );
      loginRef.current.reportValidity();
    }
  };

  const handlePasswordChange = (evt: FormEvent<HTMLInputElement>) => {
    if (passwordRef.current) {
      passwordRef.current.setCustomValidity(
        validatePassword(passwordRef.current.value),
      );
      passwordRef.current.reportValidity();
    }
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      onLoginFormSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  const handleCityClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    onCityClick(e.currentTarget.innerText);
  };

  if (isAuth) {
    return <Redirect to={AppRoutes.Main} />;
  }

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
                <input className="login__input form__input" ref={loginRef} type="email" name="email" placeholder="Email" required onChange={handleLoginChange}/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" ref={passwordRef} type="password" name="password" placeholder="Password" required onChange={handlePasswordChange}/>
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

export default SignInScreen;
