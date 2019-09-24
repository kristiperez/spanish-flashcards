import React from 'react'
import '../App.css'
import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <nav>
            <NavLink to = "/">Home</NavLink>
            <NavLink to = "/register">Register</NavLink>
            <NavLink to = "/flashcards">Flashcards</NavLink>
        </nav>
    )
}

export default Header;