import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import H2H from './components/H2H';
import PreviousScore from './components/PreviousScore';


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={PreviousScore} />
                <Route path="/h2h" component={H2H} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
