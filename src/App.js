import './App.css';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import SignUp from './Components/SignUp'
import Dashboard from './Components/Dashboard'
import Login from './Components/Login'
import UpdateProfile from './Components/UpdateProfile'
import {AuthContext} from './Components/Contexts/AuthContext'
// rutas privadas componente
import PrivateRoutes from './Components/PrivateRoutes'
function App() {
  return (
    // ingresamos las rutas iniciales del proyecto
      <AuthContext> 
        <Router>
          <Switch>
            <Route path="/signup"  component={SignUp} />
            <PrivateRoutes path="/dashboard" component={Dashboard} />
            <Route path="/" exact component={Login}/>
            <Route path="/updateProfile" component={UpdateProfile} />
          </Switch>
        </Router>
      </AuthContext>
     
  );
}

export default App;
