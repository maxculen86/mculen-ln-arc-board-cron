import React, { Component } from 'react';
import FacebookButtonComponent from '../components/facebookButton';
export default class FacebookButton extends Component {
    render() {
        return (
            <>
                {this.props.href && (
                    <FacebookButtonComponent href={this.props.href} />
                )}
            </>
        );
    }
}
