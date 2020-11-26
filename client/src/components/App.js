import React from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import Navigation from './navigation/navigation'
import SignUp from './SignUp/signup'
import Dashboard from './Dashboard/dashboard'
import Login from './LogIn/login'
import Index from './Index/index'
import Home from './Home/home'
import Error from './LogIn/error'
import Logout from './Logout/logout'
import Developers from './Developers/developers'
import './app.css'
import ContextProvider from '../contexts/context'
import Developer from './Developers/developer'
import Profile from './Profile/profile'
function App() {
  return (
    <div className="app" >
     <ContextProvider>


     <BrowserRouter>
     <Navigation/>
     
     <Route path ="/" exact component ={Index} />
     <Route path="/developer/:id" exact component={Profile}  />
     <Route path="/dashboard" exact component={Dashboard} />
     <Route path="/signup" exact component={SignUp} />
     <Route path="/login" exact component={Login} />
     <Route path="/home" exact component={Home} />
     <Route path ="/logout" exact component ={Logout} />
     <Route  path ="/developers" exact component={Developers} />
    <Route path='/login/error' exact component={Error} />
     </BrowserRouter>
     </ContextProvider>
    </div>
  );
}

export default App;
