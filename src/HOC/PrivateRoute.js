import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    return (
        <Route 
        { ...rest } 
        render={ props => {
            return (
            isAuthenticated ? 
                (
                    <Component { ...props } />
                ) :
                (
                    <Redirect 
                    to={ {
                        pathname: '/login'
                    } } 
                    />
                )
            );
         } } 
        />
    );
};

export default PrivateRoute;