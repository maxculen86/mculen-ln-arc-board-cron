import React, { Component } from 'react';
import Footer from '../private/OTT/common/footer';
import loadHeaderEvents from '../private/OTT/common/header/layoutEvents';

const layoutItems = ['Header', 'Bloque-1'];

class OTTProgramaLayout extends Component {
    render() {
        return (
            <div id="programa">
                {this.props.children[0]}
                <div className="wrapper">
                    <main className="main">
                        {this.props.children[1]}
                        <Footer />
                    </main>
                </div>
            </div>
        );
    }

    componentDidMount() {
        loadHeaderEvents();
    }
}

export default OTTProgramaLayout;

OTTProgramaLayout.sections = layoutItems;
