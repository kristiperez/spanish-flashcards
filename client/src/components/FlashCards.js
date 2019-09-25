import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import { connect } from 'react-redux'
import * as actionCreators from '../store/actions/actionCreators'

function FlashCard(props) {
    const [cards, setCards] = useState([])

    
    useEffect(() => {
        fetchCards()
    },[]) 

    // why did i have to add the []
    const fetchCards = () => {

        axios.get('http://localhost:3002/api/flashcards')
        .then(response => {
            console.log(response.data)
            setCards(response.data)
        })
    }

    const incrementIncorrectCounter = () => {
        props.onIncrementIncorrectCounter()
    }

    const incrementCorrectCounter = () => {
        props.onIncrementCounter()
    }

    return (
        <div>
            {cards.map((card,index) => {
                return (
                    <div key={index}>
                    <h3>{card.english}</h3>
                    <img src={card.imageUrl} alt="picture of word" />
                    <button onClick={() => {fetchCards();incrementCorrectCounter()}}>Got it!</button>
                    <p>{props.correctctr}</p>
                    <button onClick={() => {fetchCards();incrementIncorrectCounter()}}>Need Practice</button>
                    <p>{props.incorrectctr}</p>
                    </div>
                )
            })}
            
        </div>
    )


}

const mapDispatchToProps = (dispatch) => {
    return {
        onIncrementCounter: () => dispatch(actionCreators.incrementCorrectCounter()),
        onIncrementIncorrectCounter: () => dispatch(actionCreators.incrementIncorrectCounter())
    }
}

const mapStateToProps = (state) => {
    return {
        correctctr: state.ctrRed.counter,
        incorrectctr: state.ctrRed.incorrectCounter
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FlashCard)


