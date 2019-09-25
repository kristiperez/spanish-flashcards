import React from 'react'
import '../App.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

function Header(props) {

    const handleSignout = () => {
        // remove the jsonwebtoken from local storage
        localStorage.removeItem('jsonwebtoken')
        // update global state to set isAuthenticated = false
        props.onSignout()
    }

    return (
        <nav>
            <NavLink to = "/">Home</NavLink>
            <NavLink to = "/register">Register</NavLink>
            <NavLink to = "/login">Login</NavLink> 
            { props.authenticated ? <NavLink to = "/flashcards">Flashcards</NavLink> : null }
        </nav>
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