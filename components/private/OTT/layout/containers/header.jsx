import React, { Component } from 'react';
import HeaderComponent from '../components/header';

class Header extends Component {
    render() {
    return (
      <HeaderComponent items={this.props.items}/>
    )
  }
}

export default Header
