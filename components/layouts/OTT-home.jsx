import React, { PureComponent } from 'react';
import { headerItems, currentPrograms, urlLiveVideo } from '../private/OTT/layouts/OTTHomeIndex';
import Header from '../private/OTT/layouts/header/containers/header';
import VideoOpening from '../private/OTT/layouts/videoOpening/containers/videoOpening';
import LastVideos from '../private/OTT/layouts/lastVideos/containers/lastVideos';
import CurrentPrograms from '../private/OTT/layouts/currentPrograms/containers/currentPrograms';


const layoutItems = [
    'main'
];

class OTTHomeLayout extends PureComponent {
  render() {
    console.log(urlLiveVideo)
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