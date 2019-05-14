import React, { Component } from 'react';
import Footer from '../private/OTT/common/footer';
import LastVideos from '../private/OTT/common/lastVideos';
import Header from '../private/OTT/common/header';

import '../../resources/OTT/styles-grid/ott/ott.css';

const layoutItems = ['Bloque-1', 'Bloque-2'];

class OTTFichaLayout extends Component {
    render() {
        return (
            <>
                <div id={'acumulado'}>
                    <div className={'wrapper'}>
                        <Header />
                        <main className={'main'}>
                            {this.props.children[1]}
                            <LastVideos />
                            {this.props.children[2]}
                        </main>
                        <Footer />
                    </div>
                </div>
                <script src="https://d328y0m0mtvzqc.cloudfront.net/prod/powaBoot.js" />
            </>
        );
    }
}

export default OTTFichaLayout;

OTTFichaLayout.sections = layoutItems;
