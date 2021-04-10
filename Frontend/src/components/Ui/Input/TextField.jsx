import { Input } from '@chakra-ui/input'
import { BackgroundPrimary700, PrimaryTextColor } from '../../../config/colors'

export const TextField = props => (
    <Input
        variant='unstyled'
        color={PrimaryTextColor}
        padding='0.9rem 1rem 0.8rem'
        background={BackgroundPrimary700}
        {...props}
    />
)
