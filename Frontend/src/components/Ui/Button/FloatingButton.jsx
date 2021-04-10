import { IconButton } from '@chakra-ui/button'
import { AddIcon } from '@chakra-ui/icons'
import { Menu, MenuButton, MenuGroup, MenuList } from '@chakra-ui/menu'
import {
    BackgroundPrimary800,
    PrimaryButtonColor,
    PrimaryTextColor
} from '../../../config/colors'
import { MenuItem } from '../Menu/MenuItem'

export const FloadingButton = () => (
    <Menu>
        <MenuButton
            variant='solid'
            colorScheme={PrimaryButtonColor}
            aria-label='Menu'
            icon={<AddIcon />}
            borderRadius='50%'
            size='lg'
            position='fixed'
            bottom='2rem'
            right='2rem'
            as={IconButton}>
            Actions
        </MenuButton>
        <MenuList
            backgroundColor={BackgroundPrimary800}
            color={PrimaryTextColor}
            border='none'>
            <MenuGroup title='Profile'>
                <MenuItem>My Surveys</MenuItem>
                <MenuItem>Log out</MenuItem>
            </MenuGroup>
        </MenuList>
    </Menu>
)
