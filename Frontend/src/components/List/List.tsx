import { Flex } from '@chakra-ui/layout'
import { FunctionComponent } from 'react'

interface Props {}

export const List: FunctionComponent<Props> = props => {
    return (
        <Flex
            minHeight='full'
            direction='column'
            paddingBottom='2rem'
            gridGap='1rem'>
            {props.children}
        </Flex>
    )
}
