import * as authenticationService from "../services/authenticationService";
import {routerRedux} from "dva/router";

export default {
  namespace: 'login',
  state: {},
  reducers: {
    setRedirection(state, action) {
      return {
        ...state,
        redirection: action.payload
      }
    },
    setPrincipal(state, action) {
      return {
        ...state,
      }
    },
    deletePrincipal(state) {
      return {}
    },
  },
  effects: {
    *redirectToLogin({payload}, {call, put}) {
      yield put({
        type: 'setRedirection',
        payload: payload
      })

      yield put(routerRedux.push({
        pathname: '/login'
      }))
    },
    *login({payload}, {call, put, select}) {
      const result = yield call(authenticationService.login, payload)
      if (result.code === 200) {
        yield put({
          type: 'setPrincipal',
          payload: result.data
        })
        localStorage.setItem('token', result.data.token)
        const redirection = yield select(state => state.login.redirection)
        yield put(routerRedux.push({
          ...redirection
        }))
      } else {
        yield put({
          type: 'loginFailure',
          payload: result.message || '服务端异常'
        })
      }
    },
    *logout({}, {call, put}) {
      localStorage.removeItem('token')
      yield put(routerRedux.push({
        pathname: '/login'
      }))
    }
  },
  subscriptions: {
    setup ({dispatch}) {

    }
  },
}
