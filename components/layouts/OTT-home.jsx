import React, { PureComponent } from 'react';
import { headerItems, currentPrograms, urlLiveVideo } from '../private/OTT/layout/OTTHomeIndex';
import Header from '../private/OTT/layout/header/containers/header';
import VideoOpening from '../private/OTT/layout/videoOpening/containers/videoOpening';
import LastVideos from '../private/OTT/layout/lastVideos/containers/lastVideos';
import CurrentPrograms from '../private/OTT/layout/currentPrograms/containers/currentPrograms';


const layoutItems = [
    'main'
];

class OTTHomeLayout extends PureComponent {
  render() {
    return (
      <>
      <Header items={headerItems}/>
      <VideoOpening source={urlLiveVideo}/>
      <LastVideos />
      <CurrentPrograms items={currentPrograms}/>
        {this.props.children}
      </>
    )
  }
}

export default OTTHomeLayout;

OTTHomeLayout.sections = layoutItems