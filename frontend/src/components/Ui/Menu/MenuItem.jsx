import { MenuItem as Item } from '@chakra-ui/menu'
import {
    BackgroundPrimary700,
    BackgroundPrimary800
} from '../../../config/colors'

export const MenuItem = ({ children, ...props }) => (
    <Item
        backgroundColor={BackgroundPrimary800}
        _focus={{ backgroundColor: BackgroundPrimary700 }}
        _hover={{
            backgroundColor: BackgroundPrimary700
        }}
        {...props}>
        {children}
    </Item>
)
