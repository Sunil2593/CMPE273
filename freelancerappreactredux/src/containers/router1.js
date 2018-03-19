import React, {Component} from 'react';
import {Route,Router, Switch} from 'react-router-dom';
import login from "./login";
import Signup from "./signup";
import history from "./history";
import Home from "./home";
import Details from "./details";
import Dashboard from "./dashboard";
import PostProject from "./postproject";
import Profile from "./profile";

class router1 extends Component {
    render() {
        return (
            <Router history={history}>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/home' component={Home}/>
                <Route  path='/login' component={login}/>
                <Route  path='/signup' component={Signup}/>
                <Route  path='/details' component={Details}/>
                <Route  path='/dashboard' component={Dashboard}/>
                <Route  path='/postproject' component={PostProject}/>
                <Route  path='/profile' component={Profile}/>
            </Switch>
            </Router>
        );

    }
}
export default router1;