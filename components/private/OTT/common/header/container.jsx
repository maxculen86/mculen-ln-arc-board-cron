import React, { Component } from 'react';
import HeaderComponent from './component';

class Header extends Component {
    constructor(props) {
        super(props);
        this.data = { 'data-event': 'LinkClick', 'data-section': 'HeaderOTT' };
    }
    render() {
        return <HeaderComponent items={this.props.items} data={this.data} />;
    }
}

export default Header;
