import React, { Component } from 'react';
import Footer from '../private/OTT/common/footer';
import Header from '../private/OTT/common/header';

import '../../resources/dist/css/ott/style.css';

const layoutItems = ['Bloque-1'];

class OTTProgramaLayout extends Component {
    render() {
        return (
            <div id={'programa'}>
                <div className={'wrapper'}>
                    <Header />
                    <main className={'main'}>{this.props.children[0]}</main>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default OTTProgramaLayout;

OTTProgramaLayout.sections = layoutItems;
