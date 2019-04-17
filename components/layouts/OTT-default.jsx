import React, { Component } from 'react';
const layoutItems = ['header', 'main'];

class OTTDefaultLayout extends Component {
    render() {
        return (
            <>
                {this.props.children[0]}
                {this.props.children[1]}
            </>
        );
    }
}

export default OTTDefaultLayout;

OTTDefaultLayout.sections = layoutItems;
