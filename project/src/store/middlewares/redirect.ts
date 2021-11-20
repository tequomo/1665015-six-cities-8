import browserHistory from '../../browser-history';
import {Middleware} from 'redux';
import {rootReducer} from '../reducers/root-reducer';
import {ActionType} from '../../types/action';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {

        if (action.type === ActionType.RedirectToRoute) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
