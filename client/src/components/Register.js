import React, { useState } from 'react';
import '../register.css'
import { Form } from 'react-bootstrap';


function Register(props) {
    //if I have this, do I need { useState }
    const [user, setUser] = useState({username: '', password: ''})

    const handleSave = () => {
        fetch('http://localhost:3002/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password
            })
        })
        .then(() => {
            props.history.push('/')
        })
    }
    
    const handleTextChange = (e) => {
        setUser({
            ...user, //do I need this for registration?
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        handleSave()
    }
    // ask about diff between below and onChange={handleTextBoxChanhge from bookbarnv5}
    return (
        <div className="container">
        <div className="registrationBox">
            <h3>CREATE ACCOUNT</h3>
            <span>Register to start learning and become a global citizen.</span>
            <Form>
                <Form.Group>
            <input type="text" name="username" placeholder="Enter username" onChange={(e) => handleTextChange(e)}/>
            </Form.Group>
            <Form.Group>
            <input type="text" name="password" placeholder="Enter password" onChange={(e) => handleTextChange(e)}/>
            </Form.Group>
            <button className="customButton" onClick={handleSubmit}>Submit</button>
           
            </Form>
        </div>
        </div>
    )


}

export default Register