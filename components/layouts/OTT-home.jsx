import React, { PureComponent } from 'react';
import { urlLiveVideo } from '../private/OTT/layouts/OTTHomeIndex';
import VideoOpening from '../private/OTT/layouts/videoOpening/containers/videoOpening';
import LastVideos from '../private/OTT/layouts/lastVideos/containers/lastVideos';
import Footer from '../private/OTT/layouts/footer/containers/footer';

const layoutItems = ['header', 'main'];

class OTTHomeLayout extends PureComponent {
    render() {
        return (
            <>
                {this.props.children[0]}
                {/* <VideoOpening source={urlLiveVideo}/> */}
                {this.props.children[1]}
                <LastVideos />
                <Footer />
            </>
        );
    }
}

export default OTTHomeLayout;

OTTHomeLayout.sections = layoutItems;
