import React, { Component } from 'react';
import Footer from '../private/OTT/common/footer';
import LastVideos from '../private/OTT/common/lastVideos';
import Header from '../private/OTT/common/header';
import loadOTTVideoAnalytics from '../private/OTT/ficha/ottVideoAnalytics';
import '../../resources/dist/css/ott/style.css';
import Consumer from 'fusion:consumer';

const layoutItems = ['Bloque-1', 'Bloque-2'];

class OTTFichaLayout extends Component {
    render() {
        return (
            <>
                <div id={'acumulado'}>
                    <div className={'wrapper'}>
                        <Header />
                        <main className={'main'}>
                            {this.props.children[0]}
                            <LastVideos />
                            {this.props.children[1]}
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
        if (
            this.props.globalContent &&
            this.props.globalContent.type == 'video'
        ) {
            loadOTTVideoAnalytics(
                this.props.globalContent.headlines.basic,
                this.props.globalContent._id
            );
        }
    }
}

export default Consumer(OTTFichaLayout);

OTTFichaLayout.sections = layoutItems;
