import React from 'react'
import Header from './Header'

function BaseLayout(props) {
    return (
        <div>
            <h2>BaseLayout</h2>
            <Header />
            {props.children}
           
        </div>
    )
}

export default BaseLayout