import React, { Component } from 'react'
import HamburgerButtonComponent from '../components/hamburgerButton';

class HamburgerButton extends Component {
  render() {
    return (
        <HamburgerButtonComponent className={this.props.className}>{this.props.children}</HamburgerButtonComponent>
    )
  }
}
export default HamburgerButton
