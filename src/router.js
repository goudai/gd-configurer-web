import React from "react";
import {IndexRoute, Route, Router} from "dva/router";
import Error from "./routes/Error";
import Login from "./routes/Login";
import UserList from "./routes/user/UserList";
import ConfigList from "./routes/config/ConfigList";
import Dashboard from "./routes/dashboard/Dashboard";
import AppLayout from "./components/layout/AppLayout";

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Route path="/login" component={Login}/>
      <Route path="/" component={AppLayout}>
        <IndexRoute component={Dashboard}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/user" component={UserList}/>
        <Route path="/config" component={ConfigList}/>
        <Route path="*" component={Error}/>
      </Route>
    </Router>
  );
}

export default RouterConfig;
