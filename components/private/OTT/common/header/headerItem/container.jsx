import React, { Component } from 'react';
import HeaderItemComponent from './component';

class HeaderItem extends Component {
    render() {
        return (
            <HeaderItemComponent
                description={this.props.description}
                href={this.props.href}
                data={this.props.data}
                alt={this.props.alt}
            />
        );
    }
}

export default HeaderItem;
