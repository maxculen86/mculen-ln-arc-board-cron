import React, { Component } from 'react';

const layoutItems = ['Notas'];

class LNAcumuladoLayout extends Component {
    render() {
        return (
            <div id="wrap">
                <main>{this.props.children[0]}</main>
            </div>
        );
    }
}

LNAcumuladoLayout.sections = layoutItems;

export default LNAcumuladoLayout;
