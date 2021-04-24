import { FunctionComponent } from 'react'
import { SurveyLink } from '../../dto/get/SurveyLink'
import { SURVEY } from '../../utils/routes'
import { PrimaryButtonLink } from '../Ui/Button/PrimaryButtonLink'
import { Card } from './Card'
import { CardDescription } from './CardDescription'
import { CardHeading } from './CardHeading'

interface Props {
    survey: SurveyLink
}

export const SurveyCard: FunctionComponent<Props> = ({ survey }) => (
    <Card>
        <CardHeading>{survey.title}</CardHeading>
        <CardDescription>{survey.subtitle}</CardDescription>
        <PrimaryButtonLink size='sm' to={SURVEY + '/' + survey.publicKey}>
            Take Survey
        </PrimaryButtonLink>
    </Card>
)
