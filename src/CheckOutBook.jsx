import React, { Component } from 'react'
import NotAvailable from './components/NotAvailable'
import CheckOutForm from './components/CheckOutForm'

export class CheckOutBook extends Component {
    render() {
        return (
            <div>
                <div><NotAvailable/></div>
                <div><CheckOutForm/></div>
            </div>
        )
    }
}

export default CheckOutBook