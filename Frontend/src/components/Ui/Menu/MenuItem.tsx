import { MenuItem as Item, MenuItemProps } from '@chakra-ui/menu'
import { FunctionComponent } from 'react'
import {
    BackgroundPrimary700,
    BackgroundPrimary800
} from '../../../config/colors'

export const MenuItem: FunctionComponent<MenuItemProps> = props => (
    <Item
        backgroundColor={BackgroundPrimary800}
        _focus={{ backgroundColor: BackgroundPrimary700 }}
        _hover={{
            backgroundColor: BackgroundPrimary700
        }}
        {...props}
    />
)
