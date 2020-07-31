//AUTH ROUTES FILE


import React from "react";
import { Provider } from "react-redux";
import { Route, Switch, Link } from "react-router-dom";


import NavBarContainer from './nav_bar/nav_bar_container'
import LogInFormContainer from './session_form/login_form_container'
import SignUpFormContainer from './session_form/signup_form_container'
import { AuthRoute, ProtectedRoute } from './../util/route_util'

const App = () => (
    <div>
        {/* <h1>Testing</h1> */} 
        {/* <Link to="/"> Investi </Link> */}
        {/* <GreetingContainer /> */}
        <Switch>
            {/* <AuthRoute exact path="/login" component={LogInFormContainer} />
            <AuthRoute exact path="/signup" component={SignUpFormContainer} /> */}


            <Route exact path="/" component={NavBarContainer} />
            <AuthRoute exact path="/login" component={LogInFormContainer} />
            <AuthRoute exact path="/signup" component={SignUpFormContainer} /> 
        </Switch>
    </div>
);
export default App;
