import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'

function FlashCard() {
    const [cards, setCards] = useState([])

    useEffect(() => {
        fetchCards()
    },[])

    const fetchCards = () => {

        axios.get('http://localhost:3002/api/flashcards')
        .then(response => {
            console.log(response.data)
            setCards(response.data)
        })
    }

    return (
        <div>
            {cards.map((card,index) => {
                return (
                    <div key={index}>
                    <h3>{card.english}</h3>
                    <img src={card.imageUrl} alt="picture of word" />
                    </div>
                )
            })}
            
        </div>
    )


}

export default FlashCard


