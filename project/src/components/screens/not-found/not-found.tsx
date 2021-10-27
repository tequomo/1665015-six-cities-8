import Header from '../../layout/header/header';
import { Link } from 'react-router-dom';
import './not-found.css';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="page page--favorites-empty">
      <Header renderAuth />

      <main className="page__main">
        <div className="container">
          <section className="not-found">
            <h1 className="visually-hidden">Page not found</h1>
            <div className="not-found__status-wrapper">
              <div className="not-found__status"><b>404</b>
                <svg width="28" height="43" viewBox="0 0 28 43" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M21.62.914a1.166 1.166 0 0 1 2.278.504L15.33 40.086a1.166 1.166 0 1 1-2.277-.504L21.621.914z" fill="#4481C3"/></svg><span className="not-found__status">Page not found</span>
              </div>
              <p className="not-found__status-description">
                <Link className="not-found__link" to="/" title="Main Page">
                  Back to main page
                </Link>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundScreen;
