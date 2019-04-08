import React, { Component } from 'react'
import FooterComponent from '../components/footer'

export default class Footer extends Component {
  render() {
        const year = (new Date()).getFullYear()

        return (
            <FooterComponent year={year} />
        )
    }
}
