import React, { PureComponent } from 'react';
import { urlLiveVideo } from '../private/OTT/home/OTTHomeIndex';
import VideoOpening from '../private/OTT/home/videoOpening';
import LastVideos from '../private/OTT/common/lastVideos';
import Footer from '../private/OTT/common/footer';
import '../../resources/OTT/styles-grid/ott/ott.css';
const layoutItems = ['Header', 'Bloque-1', 'Bloque-2'];

class OTTHomeLayout extends PureComponent {
    render() {
        return (
            <div className={'wrapper'}>
                {this.props.children[0]}
                <main className={'main'}>
                    <VideoOpening source={urlLiveVideo} />
                    {this.props.children[1]}
                    <LastVideos />
                    {this.props.children[2]}
                    <Footer />
                </main>
            </div>
        );
    }
}

export default OTTHomeLayout;

OTTHomeLayout.sections = layoutItems;
