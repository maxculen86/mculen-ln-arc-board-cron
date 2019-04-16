import React, { Component } from 'react';
import TweeterButtonComponent from '../components/tweeterButton';
export default class TweeterButton extends Component {
    render() {
        return (
            <>
                {this.props.href && (
                    <TweeterButtonComponent href={this.props.href} />
                )}
            </>
        );
    }
}
