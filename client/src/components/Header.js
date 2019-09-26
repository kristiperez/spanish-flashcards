import React from 'react'
import '../header.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Navbar,Nav } from 'react-bootstrap';

function Header(props) {

    const handleSignout = () => {
        // remove the jsonwebtoken from local storage
        localStorage.removeItem('jsonwebtoken')
        // update global state to set isAuthenticated = false
        props.onSignout()
    }

    return (
        <div className="navigation-custom">
            <Navbar  variant="dark">
            <Navbar.Brand href="/">Spanish for Kids</Navbar.Brand>
            <Nav className="mr-auto">
            <NavLink className="nav-link" to = "/">Home</NavLink>
            <NavLink className="nav-link" to = "/register">Register</NavLink>
            <NavLink className="nav-link" to = "/login">Login</NavLink> 
            { props.authenticated ? <NavLink className="nav-link" to = "/flashcards">Flashcards</NavLink> : null }
            </Nav>
            </Navbar>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.authRed.isAuthenticated // props.authenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSignout: () => dispatch({type: 'SIGN_OUT'})
    }
}
// what does conncet do??
export default connect(mapStateToProps, mapDispatchToProps)(Header);