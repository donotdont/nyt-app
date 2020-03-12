import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import App from './App';
import Home from './Home';
import Detail from './Detail';
import Detail2 from './Detail2';

class Routes extends Component {
    render() {
        return (
            <Router>
                <Suspense fallback={(<div>Loading...</div>)}>
                    <Switch>
                        <Route exact path={"/"} component={Home} />
                        <Route exact path={"/:category"} component={Home} />
                        <Route exact path={"/detail/:year/:month/:day/:category/:file"} component={Detail} />
                        <Route exact path={"/detail/:year/:month/:day/:category/:type/:file"} component={Detail2} />
                    </Switch>
                </Suspense>
            </Router>
        );
    }
}

export default Routes;