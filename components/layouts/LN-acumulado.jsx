import React, { Component } from 'react';

const layoutItems = ['Notas'];

class LNAcumuladoLayout extends Component {
    render() {
        return <>{this.props.children[0]}</>;
    }
}

LNAcumuladoLayout.sections = layoutItems;

export default LNAcumuladoLayout;
