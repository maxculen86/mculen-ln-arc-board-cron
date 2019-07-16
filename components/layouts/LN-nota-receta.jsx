import React, { Component } from 'react';

const sections = ['Apertura', 'Destacado', 'Cuerpo', 'Pie', 'Tercera'];

export default class LNNotaReceta extends Component {
    static sections = sections;

    render() {
        return (
            <div>
                {this.props.children[0]}
                {this.props.children[1]}
                {this.props.children[2]}
                {this.props.children[3]}
                {this.props.children[4]}
            </div>
        );
    }
}
