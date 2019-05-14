import React, { Component } from 'react';
import Footer from '../private/OTT/common/footer';
import Header from '../private/OTT/common/header';

import '../../resources/OTT/styles-grid/ott/ott.css';

const layoutItems = ['Bloque-1'];

class OTTDefaultLayout extends Component {
    render() {
        return (
            <div className={'wrapper'}>
                <Header />
                <main className={'main'}>{this.props.children[0]}</main>
                <Footer />
            </div>
        );
    }
}

export default OTTDefaultLayout;

OTTDefaultLayout.sections = layoutItems;
