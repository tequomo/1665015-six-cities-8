import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { offers } from './mock/offers';
import { reviews } from './mock/reviews';
import { reducer } from './store/reducer';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
// import { OfferType } from './types/offer-type';

const store = createStore(
  reducer,
  composeWithDevTools(),
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={offers} reviews={reviews}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
