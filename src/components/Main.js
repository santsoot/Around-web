import React from 'react';
import { Register } from './Register';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './Login';
import { Home } from './Home';

    export class Main extends React.Component {
        getLogin = () => {
            return this.props.isLoggedIn ? <Redirect to="/home"/> : <Login handleLogin={this.props.handleLogin}/>;
        }

        getRoot = () => {
            return(
                <Redirect to="/login" /> //Redirect using history API
            );
        }

        getHome = () => {
            return this.props.isLoggedIn ? <Home /> : <Redirect to ="login"/>
        }

        render() {
            return (
                <div className="main">
                    <Switch>
                        <Route exact path ="/" render={this.getRoot}/> //exact match means if and only if
                        <Route path ="/register" component={Register} />
                        <Route path ="/login" render={this.getLogin} /> // render is in a passing props way with if else judgement
                        <Route path="/home" render={this.getHome}/>
                        <Route render={this.getRoot} />
                    </Switch>
                </div>
            );
        }
}
