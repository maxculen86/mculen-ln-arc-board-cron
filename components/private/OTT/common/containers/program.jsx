import React, { Component } from 'react';
import ProgramComponent from '../components/program';
export default class Program extends Component {
    render() {
        return (
            <ProgramComponent
                description={this.props.description}
                imgSrc={this.props.imgSrc}
                href={this.props.href}
            />
        );
    }
}
