import * as dashboardService from '../services/dashboardService'
import { routerRedux } from 'dva/router';

export default {
  namespace: 'dashboard',
  state: {

  },
  reducers: {
    setUserChart(state, {payload}) {

      return {...state, userChart: payload};
    },
  },

  effects: {
    *userChart({}, {call, put}) {
      const {data} = yield call(dashboardService.userChart);
      console.log(data);
      yield put({
        type: 'setUserChart',
        payload: data
      });
    },
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/dashboard') {
          /*dispatch({
            type: 'userChart',
            payload: {}
          });*/
        }
      });
    },
  },
}
