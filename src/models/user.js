import * as usersService from '../services/userService';
import {message} from 'antd'

export default {
  namespace: 'user',
  state: {
    list: [],
    query: {}
  },
  reducers: {
    refresh(state, {payload}) {
      return {...state, ...payload};
    },
    showModifyUserRankModal(state, {payload}){
      return {...state, modalType: 'modifyUserRank', user: payload}
    },
    hideModal(state, {}){
      return {...state, modalType: null}
    }
  },
  effects: {
    *save({payload}, {call, put, select}) {
      // save
      yield put({
        type: 'hideEditModal'
      });

      console.log(payload);

      let data = yield select(state => state.user.list)

      let mapped = data.map(v => {
        if (v.id === payload.id) {
          return {...v, ...payload}
        } else {
          return v
        }
      })

      yield put({
        type: 'refresh',
        payload: {list: mapped}
      });

      message.success('保存成功')
    },
    *query({payload}, {call, put}) {
      const {data} = yield call(usersService.list, payload)
      yield put({
        type: 'refresh',
        payload: {...data, query: payload}
      })
    },
    *reload({}, {put, select}) {
      let query = yield select(state => state.user.query)
      yield put({
        type: 'query',
        payload: query
      })
    },
    *modifyUserRank({payload}, {call, put}) {
      const {code, data} = yield call(usersService.modifyUserRank, payload)
      if (code === 0) {
        yield put({type: 'hideModal'})
        yield put({type: 'reload'})
      } else {
        message.error('设置用户等级失败')
      }
    },
    /*    *detail({payload}, {call, put}) {
     console.log('detail : ' + JSON.stringify(payload));
     yield put({type: 'showModel', payload: payload});
     },

     *reload(action, {put, select}) {
     const pageNumber = yield select(state => state.users.pageNumber);
     yield put({type: 'fetch', payload: {pageNumber}});
     },*/
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/user') {
          dispatch({
            type: 'query',
            payload: {}
          });
        }
      });
    },
  },
};
