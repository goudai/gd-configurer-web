import React from "react";
import {IndexRoute, Route, Router} from "dva/router";
import Error from "./routes/Error";
import Login from "./routes/Login";
import UserList from "./routes/user/UserList";
import Dashboard from "./routes/dashboard/Dashboard";
import App from "./components/layout/App";

function RouterConfig({history}) {
    return (
        <Router history={history}>
            <Route path="/login" component={Login}/>
            <Route path="/" component={App}>
                <IndexRoute component={Dashboard}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/user" component={UserList}/>
                <Route path="*" component={Error}/>
            </Route>
        </Router>
    );
}

export default RouterConfig;
