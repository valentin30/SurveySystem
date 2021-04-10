import { Route, Switch } from 'react-router-dom'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'

export const App = () => {
    return (
        <Switch>
            <Route path='/sign-in' exact>
                <SignIn />
            </Route>
            <Route path='/sign-up' exact>
                <SignUp />
            </Route>
            <Route path='/' exact>
                <Home />
            </Route>
        </Switch>
    )
}
