import React, { PureComponent } from 'react';
import { headerItems, currentPrograms, urlLiveVideo } from '../private/OTT/layouts/OTTHomeIndex';
import VideoOpening from '../private/OTT/layouts/videoOpening/containers/videoOpening';
import LastVideos from '../private/OTT/layouts/lastVideos/containers/lastVideos';


const layoutItems = [
    'main'
];

class OTTHomeLayout extends PureComponent {
  render() {
    return (
      <>
      {this.props.children}
      <VideoOpening source={urlLiveVideo}/>
      <LastVideos />
      </>
    )
  }
}

export default OTTHomeLayout;

OTTHomeLayout.sections = layoutItems