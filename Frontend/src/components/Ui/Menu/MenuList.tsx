import { MenuList as List, MenuListProps } from '@chakra-ui/menu'
import { FunctionComponent } from 'react'
import { BackgroundPrimary800, PrimaryTextColor } from '../../../config/colors'

export const MenuList: FunctionComponent<MenuListProps> = props => {
    return (
        <List
            backgroundColor={BackgroundPrimary800}
            color={PrimaryTextColor}
            border='none'
            {...props}
        />
    )
}
