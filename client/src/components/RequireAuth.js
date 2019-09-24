import React, { Component } from 'react';
import { connect } from 'react-redux'

// higher order component which takes in another comonent

export default function(ComposedComponent) {
    class Authenticate extends Component {
        constructor(props) {
            super(props)

            if(!this.props.isAuthenticated) {
                this.props.history.push('/')
            }
        }

        render() {

            return (
                <ComposedComponent {...this.props} />
            )
        }
    }

    const mapStatetoProps = (state) => {
        return {
            isAuthenticated: state.isAuthenticated
        }
    }

    return connect(mapStatetoProps)(Authenticate)
}