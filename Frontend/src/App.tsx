import { FunctionComponent } from 'react'
import { Route, Switch } from 'react-router-dom'
import { CreateSurvey } from './pages/CreateSurvey'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { Survey } from './pages/Survey'
import { SurveyResults } from './pages/SurveyResults'
import {
    CREATE,
    PUBLIC_KEY,
    SIGN_IN,
    SIGN_UP,
    SURVEY,
    PRIVATE_KEY,
    RESULTS,
    NO_AUTH,
    ID
} from './utils/routes'

export const App: FunctionComponent = () => {
    return (
        <Switch>
            <Route path={SURVEY + CREATE} exact>
                <CreateSurvey />
            </Route>
            <Route path={SURVEY + PUBLIC_KEY} exact>
                <Survey />
            </Route>
            <Route path={SIGN_IN} exact>
                <SignIn />
            </Route>
            <Route path={SIGN_UP} exact>
                <SignUp />
            </Route>
            <Route path={SURVEY + PRIVATE_KEY + RESULTS + NO_AUTH} exact>
                <SurveyResults pathVariableName='privateKey' />
            </Route>
            <Route path={SURVEY + ID + RESULTS} exact>
                <SurveyResults pathVariableName='id' />
            </Route>
            <Route path='/' exact>
                <Home />
            </Route>
        </Switch>
    )
}
