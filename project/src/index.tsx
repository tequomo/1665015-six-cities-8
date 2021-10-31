import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { offers } from './mock/offers';
import { reviews } from './mock/reviews';
import { reducer } from './store/reducer';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { createAPI } from './services/api';
import { requireAuthorization } from './store/action';
import { AuthStatus } from './const';
import thunk from 'redux-thunk';
import { ThunkAppDispatch } from './types/action';
import { checkAuthAction, fetchOffersAction } from './services/api-actions';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthStatus.NoAuth)),
);


const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={offers} reviews={reviews}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
