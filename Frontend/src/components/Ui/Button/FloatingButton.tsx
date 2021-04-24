import { IconButton } from '@chakra-ui/button'
import { AddIcon } from '@chakra-ui/icons'
import { Menu, MenuButton, MenuGroup } from '@chakra-ui/menu'
import { FunctionComponent } from 'react'
import { useHistory } from 'react-router-dom'
import { PrimaryButtonColor } from '../../../config/colors'
import { useAuth } from '../../../hooks/useAuth'
import { SIGN_IN, SIGN_UP, SURVEY, USER } from '../../../utils/routes'
import { MenuItem } from '../Menu/MenuItem'
import { MenuList } from '../Menu/MenuList'

export const FloatingButton: FunctionComponent = () => {
    const history = useHistory()
    const { token, logout } = useAuth()

    return (
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
            <MenuList>
                <MenuGroup title='Profile'>
                    {token ? (
                        <>
                            <MenuItem
                                onClick={() => history.push(SURVEY + USER)}>
                                My Surveys
                            </MenuItem>
                            <MenuItem onClick={logout}>Log out</MenuItem>
                        </>
                    ) : (
                        <>
                            <MenuItem onClick={() => history.push(SIGN_IN)}>
                                Sign In
                            </MenuItem>
                            <MenuItem onClick={() => history.push(SIGN_UP)}>
                                Sign Up
                            </MenuItem>
                        </>
                    )}
                </MenuGroup>
            </MenuList>
        </Menu>
    )
}
