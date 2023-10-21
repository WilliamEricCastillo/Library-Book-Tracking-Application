import React, { Component } from 'react'
import Available from './components/Available'
import CheckIn from './components/CheckIn'

export class CheckOutBookPage extends Component {
    render() {
        return (
            <div>
                <Available/>
                <CheckIn/>
            </div>
        )
    }
}

export default CheckOutBookPage