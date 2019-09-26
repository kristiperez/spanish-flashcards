import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import { connect } from 'react-redux'
import * as actionCreators from '../store/actions/actionCreators'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import '../FlashCard.css'

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

    const add = props.correctctr + props.incorrectctr

    return (
        <div>
            {cards.map((card,index) => {
                if(add < 10) {
                    return (
                        <div key={index} className="flashcontainer">
                            
                         <Card style={{ width: '250px' }}>
                            <Card.Img variant="top" src={card.imageUrl} alt="picture of word" />
                            <Card.Body >
                                <Card.Title>{card.english}</Card.Title>
                                <div className="buttonContainer">
                                <Button variant="success" onClick={() => {fetchCards();incrementCorrectCounter()}}>Got it!</Button>
                                <Button variant="warning" onClick={() => {fetchCards();incrementIncorrectCounter()}}>Need Practice</Button>
                                </div>
                            </Card.Body>
                        </Card>
                        <div className="score">
                        <div className="correct">
                        <h5>Correct</h5>   
                        <h5>{props.correctctr}</h5>
                        </div>
                        <div className="incorrect">
                        <h5>Incorrect</h5>  
                        <h5>{props.incorrectctr}</h5>
                        </div>
                        </div>
                        </div>
                    )
                } else {
                    props.history.push('/score')
                }
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


