import './App.css';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import SignUp from './Components/SignUp'
import Dashboard from './Components/Dashboard'
import Login from './Components/Login'
import UpdateProfile from './Components/UpdateProfile'
import ForgotPassword from './Components/ForgotPassword'
// estados globales 
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
            <PrivateRoutes path="/updateProfile" component={UpdateProfile} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </Router>
      </AuthContext>
     
  );
}

export default App;
