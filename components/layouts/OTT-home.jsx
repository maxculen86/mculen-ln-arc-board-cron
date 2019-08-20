import React, { PureComponent } from 'react';
import { urlLiveVideo } from '../private/OTT/home/OTTHomeIndex';
import VideoOpening from '../private/OTT/home/videoOpening';
import LastVideos from '../private/OTT/common/lastVideos';
import Footer from '../private/OTT/common/footer';
import loadHeaderEvents from '../private/OTT/common/header/layoutEvents';

import '../../assets/bundles/css/ott/style.css';

const layoutItems = ['Header', 'Bloque-1', 'Bloque-2'];

class OTTHomeLayout extends PureComponent {
    render() {
        return (
            <>
                {this.props.children[0]}
                <div className={'wrapper'}>
                    <main className={'main'}>
                        <VideoOpening source={urlLiveVideo} />
                        {this.props.children[1]}
                        <LastVideos />
                        {this.props.children[2]}
                        <Footer />
                    </main>
                </div>
            </>
        );
    }
    componentDidMount() {
        loadHeaderEvents();
    }
}

export default OTTHomeLayout;

OTTHomeLayout.sections = layoutItems;
