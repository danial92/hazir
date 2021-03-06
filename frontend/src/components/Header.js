import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import SearchBox from '../screens/SearchBox'
import { Route } from 'react-router-dom'


const Header = () => {
    
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout())
    }
 
    return (
        <header>
            <Navbar bg="primary" variant='dark' expand="lg">
                <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand >Hazir</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Route render={({ history }) => <SearchBox history={history} />} />
                    <Nav className="ml-auto">
                    <LinkContainer to='/cart'>
                        <Nav.Link >Cart</Nav.Link>
                    </LinkContainer>
                    {
                        userInfo ? ( 
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'> 
                                    <NavDropdown.Item>Profile</NavDropdown.Item> 
                                </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item> {/* above (below NavDropdown starting tag) we used a LinkContainer coz we are supposed to redirect to profile page when clicked on profile */} {/* here, we didn't use the LinkContainer coz we are not redirecting to any page when clicked on logout */} 
                            </NavDropdown>
                            ) : (
                            <LinkContainer to='/login'>
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        )
                    }
                    {
                        userInfo && userInfo.isAdmin && 
                            (<NavDropdown title='Admin' id='admin'>
                                <LinkContainer to='/admin/userlist'> 
                                    <NavDropdown.Item>Users</NavDropdown.Item> 
                                </LinkContainer>
                                <LinkContainer to='/admin/productlist'> 
                                    <NavDropdown.Item>Products</NavDropdown.Item> 
                                </LinkContainer>
                                <LinkContainer to='/admin/orderlist'> 
                                    <NavDropdown.Item>Orders</NavDropdown.Item> 
                                </LinkContainer>
                            </NavDropdown>) 
                    }
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
