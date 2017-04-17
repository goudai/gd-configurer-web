import dva from 'dva';
import { hashHistory, routerRedux } from 'dva/router';
import createLoading from 'dva-loading';
import './index.html';
import './index.css';
import { message } from 'antd';

// 1. Initialize
const app = dva({
  history: hashHistory
});

app.use({
  onError: function(e) {

    if (e.message == 401) {
      app._store.dispatch({
        type: 'login/redirectToLogin',
        payload: app._store.getState().routing.locationBeforeTransitions
      })
    } else {
      message.error('服务器处理异常, 异常信息:' + e.message, 8);
    }
  }
})

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/login'));
app.model(require('./models/app'));
app.model(require('./models/config'));
app.model(require('./models/dashboard'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
