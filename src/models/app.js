import * as appService from '../services/AuthenticationService'
import {routerRedux} from 'dva/router';

export default {
  namespace: 'app',
  state: {
    login: false,
    loading: false,
    loginButtonLoading: false,
    isPopoverMenuVisible: false,
    isSiderFolded: false,
    isDarkTheme: true,
    isMobile: document.body.clientWidth < 769
  },
  reducers: {
    setRedirection(state, action) {
      return {
        ...state,
        redirection: action.payload
      }
    },
    loginSuccess(state, action) {
      return {
        ...state,
        user: action.payload,
        login: true,
        loginButtonLoading: false,
        loading: false
      }
    },
    loginFailure(state, action) {
      return {
        ...state,
        login: false,
        loginMessage: action.payload,
        loginButtonLoading: false
      }
    },
    logoutSuccess(state) {
      return {
        ...state,
        login: false
      }
    },
    showLoginButtonLoading(state) {
      return {
        ...state,
        loginButtonLoading: true
      }
    },
    showLoading(state) {
      return {
        ...state,
        loading: true
      }
    },
    hideLoading(state) {
      return {
        ...state,
        loading: false
      }
    },
    foldSider(state) {
      return {
        ...state,
        isSiderFolded: !state.isSiderFolded
      }
    },
    changeTheme(state) {
      return {
        ...state,
        isDarkTheme: !state.isDarkTheme
      }
    },
    changeMobile(state, {payload}) {
      return {
        ...state,
        isMobile: payload
      }
    },
    switchMenuPopover(state) {
      return {
        ...state,
        isPopoverMenuVisible: !state.isPopoverMenuVisible
      }
    },
    setShiro(state, {payload}) {
      return {
        ...state,
        shiro: payload
      }
    }
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
      yield put({type: 'showLoginButtonLoading'})
      const result = yield call(appService.login, payload)
      if (result.code === 0) {
        yield put({
          type: 'loginSuccess',
          payload: result.data
        })

        const redirection = yield select(state => state.app.redirection)

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
    *getCurrentUser({}, {call, put}) {
      yield put({type: 'showLoading'})
      const result = yield call(appService.getCurrentUser)
      if (result.data) {
        yield put({
          type: 'loginSuccess',
          payload: result.data
        })
      } else {
        yield put({type: 'hideLoading'})
        yield put(routerRedux.push({
          pathname: '/login'
        }))
      }
    },
    *logout({}, {call, put}) {
      const result = yield call(appService.logout)
      if (result.code === 0) {
        yield put(routerRedux.push({
          pathname: '/login'
        }))
      }
    }
  },
  subscriptions: {
    setup ({dispatch}) {
      dispatch({type: 'getCurrentUser'})

      dispatch({type: 'setShiro', payload: {
        permissions: ['user:view']


      }})

      window.onresize = function () {
        if (document.body.clientWidth < 769) {
          dispatch({type: 'changeMobile', payload: true})
        } else {
          dispatch({type: 'changeMobile', payload: false})
        }

      }
    }
  },
}
