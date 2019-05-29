import React, { Component } from 'react';
import Footer from '../private/OTT/common/footer';
import loadHeaderEvents from '../private/OTT/common/header/layoutEvents';

import '../../resources/dist/css/ott/style.css';

const layoutItems = ['Header', 'Bloque-1'];

class OTTDefaultLayout extends Component {
    render() {
        return (
            <div className={'wrapper'}>
                {this.props.children[0]}
                <main className={'main'}>{this.props.children[1]}</main>
                <Footer />
            </div>
        );
    }
    componentDidMount() {
        loadHeaderEvents();
    }
}

export default OTTDefaultLayout;

OTTDefaultLayout.sections = layoutItems;
