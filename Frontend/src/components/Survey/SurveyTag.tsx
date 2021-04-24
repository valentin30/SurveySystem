import { Tag } from '@chakra-ui/tag'
import { FunctionComponent } from 'react'
import { PrimaryButtonColor } from '../../config/colors'

interface Props {
    size: 'sm' | 'md'
}

export const SurveyTag: FunctionComponent<Props> = props => {
    return (
        <Tag
            size={props.size}
            colorScheme={PrimaryButtonColor}
            variant='solid'
            ml={props.size === 'md' ? 0 : '0.75rem'}
            fontWeight='bold'>
            {props.children}
        </Tag>
    )
}
