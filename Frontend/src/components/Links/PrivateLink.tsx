import { useClipboard } from '@chakra-ui/hooks'
import React, { FunctionComponent } from 'react'
import { NO_AUTH, RESULTS, SURVEY } from '../../utils/routes'
import { Link } from './Link'

interface Props {
    path: string
}

export const PrivateLink: FunctionComponent<Props> = props => {
    const privatePath: string = SURVEY + '/' + props.path + RESULTS + NO_AUTH

    const { value, onCopy } = useClipboard(window.location.origin + privatePath)

    return <Link label='Private Link' link={value} onCopy={onCopy} />
}
