import React from 'react'
import logImg from './logo.png'
import './logo.css'

class Logo extends React.Component {
    render() {
        return (
            <div className='logo-continer'>
                <img src={logImg} alt=""/>
            </div>
        )
    }

}

export default Logo