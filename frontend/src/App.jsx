import { Route, Switch } from 'react-router-dom'
import { Home } from './pages/Home'

export const App = () => {
    return (
        <Switch>
            <Route path='/' exact>
                <Home />
            </Route>
        </Switch>
    )
}
