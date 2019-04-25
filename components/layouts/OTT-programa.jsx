import React, { Component } from 'react';
import Footer from '../private/OTT/layouts/footer/containers/footer';
import '../../resources/OTT/styles-grid/ott/ott.css';

const layoutItems = ['Header', 'Bloque-1', 'Bloque-2'];

class OTTProgramaLayout extends Component {
    render() {
        return (
            <div id={'programa'}>
                <div className={'wrapper'}>
                    {this.props.children[0]}
                    <main className={'main'}>
                        {this.props.children[1]}
                        {this.props.children[2]}
                    </main>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default OTTProgramaLayout;

OTTProgramaLayout.sections = layoutItems;
