import React, { useState } from 'react'
import axios from 'axios'
import { setAuthenticationHeader } from '../utils/authenticate'
import { connect } from 'react-redux'
import '../Login.css'


function Login(props) {
    const [user, setUser] = useState({username: '', password: ''})

    const handleLogin = () => {
        // perform a login request to the server
        axios.post('http://localhost:3002/login', {
            username: user.username,
            password: user.password
        }).then(response => {
            const token = response.data.token
            // save token in local storage
            localStorage.setItem('jsonwebtoken', token)
            // set default axios header
            setAuthenticationHeader(token)
            console.log(response.data)
            //change redux state to isAuthenticated true
            props.onAuthenticated(token)
            props.history.push('/flashcards')
        })
    }

    const handleTextChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="container">
            <div className="registrationBox">
            <h3>LOGIN</h3>
            <div className="inputs">
            <input type="text" name="username" placeholder="Enter username" onChange={(e) => handleTextChange(e)} />
            </div>
            <div className="inputs">
            <input type="text" name="password" placeholder="Enter password"onChange={(e) => handleTextChange(e)} />
            </div>
            <button className="customButton" onClick={() => handleLogin()}>Login</button>
            <span>Don't have an account?<a href="#"> Create one</a></span>
            </div>
            
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthenticated: (token) => dispatch({type: 'ON_AUTHENTICATED', token: token})
    }
}

export default connect(null,mapDispatchToProps)(Login)