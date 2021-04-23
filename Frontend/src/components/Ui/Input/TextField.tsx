import { Input, InputProps } from '@chakra-ui/input'
import { forwardRef, ForwardRefExoticComponent } from 'react'
import { BackgroundPrimary700, PrimaryTextColor } from '../../../config/colors'

export const TextField: ForwardRefExoticComponent<
    InputProps & React.RefAttributes<HTMLInputElement>
> = forwardRef((props, ref) => (
    <Input
        ref={ref}
        variant='unstyled'
        color={PrimaryTextColor}
        padding='0.9rem 1rem 0.8rem'
        background={BackgroundPrimary700}
        {...props}
    />
))
