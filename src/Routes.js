import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import App from './App';
import Home from './Home';

class Routes extends Component {
    render() {
        return (
            <Router>
                <Suspense fallback={(<div>Loading...</div>)}>
                    <Switch>
                        <Route exact path={"/"} component={Home} />
                    </Switch>
                </Suspense>
            </Router>
        );
    }
}

export default Routes;