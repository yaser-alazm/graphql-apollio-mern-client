import React, { useContext ,useState } from 'react'
import {AuthContext} from '../context/auth'

import { Menu, Container } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

function Navbar() {

    const {user, logout} = useContext(AuthContext)
    const {pathname} = window.location;
    const path = pathname === '/' ? 'home' : pathname.substr(1)

    const [activeItem, setActiveItem] = useState(path)

    const handleItemClick = (e, { name }) => setActiveItem(name)

    const menuContent = user ? (
        <Menu pointing secondary>
            <Container>
                <Menu.Item
                    name= {user.username}
                    as="div"
                />
                <Menu.Item
                    name= "Home"
                    active
                    as={Link}
                    to="/"
                />
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='logout'
                        onClick={logout}
                    />
                </Menu.Menu>
            </Container>
        </Menu>
    ) : (
        <Menu pointing secondary>
            <Container>
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/"
                />
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='login'
                        active={activeItem === 'login'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/login"
                    />
                    <Menu.Item
                        name='register'
                        active={activeItem === 'register'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/register"
                    />
                </Menu.Menu>
            </Container>
        </Menu>
    )

    return menuContent
}


export default Navbar;