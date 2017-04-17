import * as appService from "../services/appService";
import {message} from "antd";

export default {
  namespace: 'app',
  state: {
    list: [],
    viewType: 'list'
  },
  reducers: {
    setList(state, {payload}) {
      return {...state, list: payload};
    },
    hideModal(state, {}){
      return {...state, viewType: 'list'}
    },
    toCreate(state, {}){
      return {...state, viewType: 'create', record: {}}
    },
    toModify(state, {payload}){
      return {...state, viewType: 'modify', record: payload}
    }
  },
  effects: {
    *query({payload}, {call, put}) {
      const {code, data} = yield call(appService.list, payload)
      if (code === 200) {
        yield put({
          type: 'setList',
          payload: data
        })
      }
    },
    *reload({}, {put, select}) {
      let query = yield select(state => state.app.query)
      yield put({
        type: 'query',
        payload: query
      })
    },
    *create({payload}, {call, put}) {
      const {code, message, data} = yield call(appService.create, payload)
      if (code === 200) {
        yield put({type: 'hideModal'})
        yield put({type: 'reload'})
      } else {
        message.error(`编辑失败,${message}`)
      }
    },
    *modify({payload}, {call, put}) {
      const {code, message, data} = yield call(appService.modify, payload)
      if (code === 200) {
        yield put({type: 'hideModal'})
        yield put({type: 'reload'})
      } else {
        message.error(`编辑失败,${message}`)
      }
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/app') {
          dispatch({
            type: 'query',
            payload: {}
          });
        }
      });
    },
  },
};
