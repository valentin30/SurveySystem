import { Button, ButtonProps } from '@chakra-ui/button'
import { FunctionComponent } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { PrimaryButtonColor } from '../../../config/colors'

export const PrimaryButtonLink: FunctionComponent<
    ButtonProps & LinkProps
> = props => {
    return <Button as={Link} colorScheme={PrimaryButtonColor} {...props} />
}
