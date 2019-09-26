import React from 'react'
import Header from './Header'
import '../BaseLayout.css'

function BaseLayout(props) {
    return (
        <div>
          
            <Header />
            {props.children}
           
        </div>
    )
}

export default BaseLayout