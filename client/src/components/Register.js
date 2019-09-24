import React, { useState } from 'react';
import '../App.css';


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
        <div>
            <input type="text" name="username" placeholder="Enter username" onChange={(e) => handleTextChange(e)}/>
            <input type="text" name="password" placeholder="Enter password" onChange={(e) => handleTextChange(e)}/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )


}

export default Register