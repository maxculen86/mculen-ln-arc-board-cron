import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import Footer from '../private/OTT/common/footer';
import LastVideos from '../private/OTT/common/lastVideos';
import loadHeaderEvents from '../private/OTT/common/header/layoutEvents';
import loadOTTVideoAnalytics from '../private/OTT/ficha/ottVideoAnalytics';
import loadOTTVideoStyles from '../private/OTT/ficha/ottVideoStyles';

const layoutItems = ['Header', 'Bloque-1', 'Bloque-2'];

class OTTFichaLayout extends Component {
    componentDidMount() {
        loadHeaderEvents();
        if (
            this.props.globalContent &&
            this.props.globalContent.type === 'video'
        ) {
            loadOTTVideoStyles();
            loadOTTVideoAnalytics(
                this.props.globalContent.headlines.basic,
                this.props.globalContent._id
            );

            const videoScript = document.createElement('script');
            videoScript.src =
                'https://dzyf5jtgd0sxp.cloudfront.net/prod/powaBoot.js';
            videoScript.async = true;
            document.head.appendChild(videoScript);
        }
    }

    render() {
        return (
            <div id="acumulado">
                {this.props.children[0]}
                <div className="wrapper">
                    <main className="main">
                        {this.props.children[1]}
                        <LastVideos />
                        {this.props.children[2]}
                        <Footer />
                    </main>
                </div>
            </div>
        );
    }
}
OTTFichaLayout.sections = layoutItems;

export default Consumer(OTTFichaLayout);
