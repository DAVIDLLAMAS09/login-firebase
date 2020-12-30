import React from 'react';
import { Route,Redirect} from 'react-router-dom'
import {useAuth} from './Contexts/AuthContext'

 const PrivateRoutes = ({component : Component,path,...rest}) => {
     console.log(Component)
    const { currenUser } = useAuth();
    return (
        <Route
        path={path}
        {...rest}
        render ={ props => {
            console.log(props);
            currenUser ? <Component {...props} /> : <Redirect to="/hola" />
        }
    }
        />
    );
};

export default PrivateRoutes;