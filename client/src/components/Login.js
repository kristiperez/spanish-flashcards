import React, { useState } from 'react'
import axios from 'axios'
import { setAuthenticationHeader } from '../utils/authenticate'
import { connect } from 'react-redux'


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
        <div>
            <input type="text" name="username" onChange={(e) => handleTextChange(e)} />
            <input type="text" name="password" onChange={(e) => handleTextChange(e)} />
            <button onClick={() => handleLogin()}>Login</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthenticated: (token) => dispatch({type: 'ON_AUTHENTICATED', token: token})
    }
}

export default connect(null,mapDispatchToProps)(Login)
