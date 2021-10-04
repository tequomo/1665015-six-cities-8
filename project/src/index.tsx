import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Parameters = {
  OFFERS_COUNT: 312,
  OFFERS_SHOWN: 5,
};

ReactDOM.render(
  <React.StrictMode>
    <App offersCount={Parameters.OFFERS_COUNT} offersShown={Parameters.OFFERS_SHOWN}/>
  </React.StrictMode>,
  document.getElementById('root'));
