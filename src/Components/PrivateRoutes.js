import React from 'react';
import { Link } from 'react-router-dom'
import {useAuth} from './Contexts/AuthContext'

 const PrivateRoutes = ({component:Component,...rest}) => {
    const { currenUser } = useAuth();
    return (
        currenUser ? 
        <Component {...rest}/> :<p>debes de loguearte <Link to="/">iniciar sesion</Link></p> 
    );
};

export default PrivateRoutes;

// opcion a considerar no rendewrizo
// import React, { useEffect, useState } from 'react';
// import { Route, Redirect} from 'react-router-dom'
// import {useAuth} from './Contexts/AuthContext'

//  const PrivateRoutes = ({component:Component,...rest}) => {
//     const { currenUser } = useAuth();

//     return (
//         <Route
//         {...rest}
//         render={(props)=>{
//             currenUser ? <Component {...props}/> : <Redirect to="/"></Redirect>
//         }}
//         ></Route>
     
//     );
// };

// export default PrivateRoutes;

