import React, {Fragment} from 'react';
import {Navbar,Nav,NavDropdown, Container} from 'react-bootstrap'
import {useAuth} from './Contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'
import Logo from '../img/logo.svg'
import Avatar from '../img/avatar.png'

export default function Header(props) {

    const {currenUser,logout}  = useAuth();
    const history = useHistory();
    const {photoURL,displayName} = currenUser.providerData[0]
    // const {url} =  currenUser.additionalUserInfo.profile.picture.data
    return (
        <Fragment>
                <Navbar className="HeaderStyle" variant="dark" expand="md">
                <Container>
                    <Link to="/dashboard">
                        <Navbar.Brand>
                            <img alt="" src={Logo} width="35" height="35" className="inline-block align-top pr-1 mr-1"/>Demo
                        </Navbar.Brand>
                    </Link>
                   
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {/* <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link> */}
                            <img alt="" src={photoURL?photoURL:Avatar} width="35" style={{borderRadius:60}} height="35" className="inline-block align-top mt-1 mr-2"/>
                            <NavDropdown title={displayName ? displayName : 'Actualiza tu perfil'} id="basic-nav-dropdown">
                                <Link 
                                to={{
                                    pathname:"/updateProfile",
                                    state:{
                                        imgUser:photoURL,
                                        nameUser:displayName
                                    }
                                }}>
                                   Actualizar Perfil
                                </Link>
                                <NavDropdown.Item>Cambiar Contraseña </NavDropdown.Item>
                                <NavDropdown.Item href="#" onClick={()=>{
                                logout()
                                history.push("/")
                                }
                            }>Cerrar Sesión</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    </Container>
                </Navbar>
        </Fragment>
    );
}
