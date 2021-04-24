import React, { FunctionComponent } from 'react'
import { UserSurvey } from '../../dto/user/UserSurvey'
import { RESULTS, SURVEY } from '../../utils/routes'
import { PrimaryButtonLink } from '../Ui/Button/PrimaryButtonLink'
import { Card } from './Card'
import { CardDescription } from './CardDescription'
import { CardHeading } from './CardHeading'

interface Props {
    survey: UserSurvey
}

export const UserSurveyCard: FunctionComponent<Props> = ({ survey }) => {
    return (
        <Card>
            <CardHeading>{survey.title}</CardHeading>
            <CardDescription>{survey.subtitle}</CardDescription>
            <PrimaryButtonLink
                size='sm'
                to={SURVEY + '/' + survey.id + RESULTS}>
                Results
            </PrimaryButtonLink>
        </Card>
    )
}
