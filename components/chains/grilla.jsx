import React, { Component } from 'react';

export default class grilla extends Component {
    render() {
        return <div style={{ float: 'left' }}>{this.props.children}</div>;
    }
}
