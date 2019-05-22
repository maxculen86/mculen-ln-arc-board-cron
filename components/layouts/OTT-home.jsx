import React, { PureComponent } from 'react';
import { urlLiveVideo } from '../private/OTT/home/OTTHomeIndex';
import VideoOpening from '../private/OTT/home/videoOpening';
import LastVideos from '../private/OTT/common/lastVideos';
import Footer from '../private/OTT/common/footer';
import Header from '../private/OTT/common/header';

import '../../resources/dist/css/ott/style.css';

const layoutItems = ['Bloque-1', 'Bloque-2'];

class OTTHomeLayout extends PureComponent {
    render() {
        return (
            <div className={'wrapper'}>
                <Header />
                <main className={'main'}>
                    <VideoOpening source={urlLiveVideo} />
                    {this.props.children[0]}
                    <LastVideos />
                    {this.props.children[1]}
                    <Footer />
                </main>
            </div>
        );
    }
}

export default OTTHomeLayout;

OTTHomeLayout.sections = layoutItems;
