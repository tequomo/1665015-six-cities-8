import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { offers } from './mock/offers';

const Parameters = {
  OFFERS_COUNT: 312,
};

ReactDOM.render(
  <React.StrictMode>
    <App offersCount={Parameters.OFFERS_COUNT} offers={offers}/>
  </React.StrictMode>,
  document.getElementById('root'));
