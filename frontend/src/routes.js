import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProtectedRouter from './helper/ProtectedRoutes';
import { ProvideAuth } from './services/authHook';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';

function Router() {
    return (
        <BrowserRouter>
            <ProvideAuth>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/register" component={Register} />
                    <ProtectedRouter path="/profile" component={Profile} />
                </Switch>
            </ProvideAuth>
        </BrowserRouter>
    );
}

export default Router;