import React, { PureComponent } from 'react';
import { urlLiveVideo } from '../private/OTT/layouts/OTTHomeIndex';
import VideoOpening from '../private/OTT/layouts/videoOpening/containers/videoOpening';
import LastVideos from '../private/OTT/layouts/lastVideos/containers/lastVideos';
import Footer from '../private/OTT/layouts/footer/containers/footer';
import '../../resources/OTT/styles-grid/ott/ott.css';
const layoutItems = ['Header', 'Bloque-1', 'Bloque-2'];

class OTTHomeLayout extends PureComponent {
    render() {
        return (
            <main className={'main'}>
                {this.props.children[0]}
                <VideoOpening source={urlLiveVideo} />
                {this.props.children[1]}
                <LastVideos />
                {this.props.children[2]}
                <Footer />
            </main>
        );
    }
}

export default OTTHomeLayout;

OTTHomeLayout.sections = layoutItems;
