import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';


const AppRouter = () => {
    const isAuth = false;   
    return(
        <Switch>
            {isAuth && authRoutes.map(({path, Component}) => 
                <Route path={path} component={Component} exact/>   
            )}
            {publicRoutes.map(({path, Component}) => 
                <Route path={path} component={Component} exact/>   
            )}
        </Switch>
    );
};

export default AppRouter;