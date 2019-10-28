import React, { Component } from 'react';
import Footer from '../private/OTT/common/footer';
import loadHeaderEvents from '../private/OTT/common/header/layoutEvents';

const layoutItems = ['Header', 'Bloque-1'];

class OTTDefaultLayout extends Component {
    render() {
        return (
            <>
                {this.props.children[0]}
                <div className="wrapper">
                    <main className="main">{this.props.children[1]}</main>
                    <Footer />
                </div>
            </>
        );
    }

    componentDidMount() {
        loadHeaderEvents();
    }
}

export default OTTDefaultLayout;

OTTDefaultLayout.sections = layoutItems;
