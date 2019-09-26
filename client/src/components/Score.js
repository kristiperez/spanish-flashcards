import React, { useState } from 'react'
import '../App.css'
import { connect } from 'react-redux'
import '../score.css'

function Score(props) {
    return(
        <div className="container">
        <div className="finalScore">
            <span>You got</span>
            <p>{props.correctctr}</p>
            <span>correct!</span>
        </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        correctctr: state.ctrRed.counter
    }
}

export default connect(mapStateToProps)(Score)
