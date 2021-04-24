import { useClipboard } from '@chakra-ui/hooks'
import React, { FunctionComponent } from 'react'
import { SURVEY } from '../../utils/routes'
import { Link } from './Link'

interface Props {
    path: string
}

export const PublicLink: FunctionComponent<Props> = props => {
    const { value, onCopy } = useClipboard(
        window.location.origin + SURVEY + '/' + props.path
    )

    console.log()

    return <Link label='Public Link' link={value} onCopy={onCopy} />
}
