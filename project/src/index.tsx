import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
// import { applyMiddleware, createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { createAPI } from './services/api';
import { requireAuthorization } from './store/action';
import { AuthStatus } from './const';
// import thunk from 'redux-thunk';
import { ThunkAppDispatch } from './types/action';
import { checkAuthAction } from './services/api-actions';
import { redirect } from './store/middlewares/redirect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { rootReducer } from './store/reducers/root-reducer';
import { configureStore } from '@reduxjs/toolkit';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthStatus.NoAuth)),
);


// const store = createStore(
//   rootReducer,
//   composeWithDevTools(
//     applyMiddleware(thunk.withExtraArgument(api)),
//     applyMiddleware(redirect),
//   ),
// );

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

(store.dispatch as ThunkAppDispatch)(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
