import * as configService from '../services/configService';
import {message} from 'antd'

export default {
  namespace: 'config',
  state: {
    list: [],
    query: {}
  },
  reducers: {
    refresh(state, {payload}) {
      return {...state, ...payload};
    },
    showModal(state, {payload}){
      return {...state, modalType: 'modify', record: payload}
    },
    hideModal(state, {}){
      return {...state, modalType: null}
    }
  },
  effects: {
    *query({payload}, {call, put}) {
      const {data} = yield call(configService.list, payload)
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
    *create({payload}, {call, put}) {
      const {code, data} = yield call(configService.create, payload)
      if (code === 0) {
        yield put({type: 'hideModal'})
        yield put({type: 'reload'})
      } else {
        message.error('设置用户等级失败')
      }
    },
    *modify({payload}, {call, put}) {
      const {code, data} = yield call(configService.modify, payload)
      if (code === 0) {
        yield put({type: 'hideModal'})
        yield put({type: 'reload'})
      } else {
        message.error('设置用户等级失败')
      }
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/config') {
          dispatch({
            type: 'query',
            payload: {}
          });
        }
      });
    },
  },
};
