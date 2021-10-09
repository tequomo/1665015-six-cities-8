import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { offers } from './mock/offers';

const Parameters = {
  OFFERS_COUNT: 312,
  OFFERS_SHOWN: 5,
};

ReactDOM.render(
  <React.StrictMode>
    <App offersCount={Parameters.OFFERS_COUNT} offersShown={Parameters.OFFERS_SHOWN} offers={offers}/>
  </React.StrictMode>,
  document.getElementById('root'));
