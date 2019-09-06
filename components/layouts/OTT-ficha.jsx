import React, { Component } from 'react';
import Footer from '../private/OTT/common/footer';
import LastVideos from '../private/OTT/common/lastVideos';
import loadHeaderEvents from '../private/OTT/common/header/layoutEvents';
import loadOTTVideoAnalytics from '../private/OTT/ficha/ottVideoAnalytics';
import loadOTTVideoStyles from '../private/OTT/ficha/ottVideoStyles';

import Consumer from 'fusion:consumer';

const layoutItems = ['Header', 'Bloque-1', 'Bloque-2'];

class OTTFichaLayout extends Component {
    render() {
        return (
            <>
                <div id={'acumulado'}>
                    {this.props.children[0]}
                    <div className={'wrapper'}>
                        <main className={'main'}>
                            {this.props.children[1]}
                            <LastVideos />
                            {this.props.children[2]}
                        </main>
                        <Footer />
                    </div>
                </div>
                {this.props.globalContent &&
                    this.props.globalContent.type == 'video' && (
                        <script src="https://d328y0m0mtvzqc.cloudfront.net/prod/powaBoot.js" />
                    )}
            </>
        );
    }

    componentDidMount() {
        loadHeaderEvents();
        if (
            this.props.globalContent &&
            this.props.globalContent.type == 'video'
        ) {
            loadOTTVideoStyles();
            loadOTTVideoAnalytics(
                this.props.globalContent.headlines.basic,
                this.props.globalContent._id
            );
        }
    }
}

export default Consumer(OTTFichaLayout);

OTTFichaLayout.sections = layoutItems;
