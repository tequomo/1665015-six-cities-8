import browserHistory from '../browser-history';
// import { useHistory } from 'react-router';
import {Middleware} from 'redux';
import {reducer} from '../store/reducer';
import {ActionType} from '../types/action';

type Reducer = ReturnType<typeof reducer>;

// eslint-disable-next-line react-hooks/rules-of-hooks
// const history = useHistory();

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {

        if (action.type === ActionType.RedirectToRoute) {
          // history.push(action.payload);
          browserHistory.push(action.payload);
        }

        return next(action);
      };

