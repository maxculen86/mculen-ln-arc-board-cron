import React, { PureComponent } from 'react';
import { headerItems, currentPrograms, urlLiveVideo } from '../private/OTT/layout/OTTHomeIndex';
import Header from '../private/OTT/layout/header/containers/header';
import VideoOpening from '../private/OTT/layout/videoOpening/containers/videoOpening';
import CurrentPrograms from '../private/OTT/layout/currentPrograms/containers/currentPrograms';


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
      <CurrentPrograms items={currentPrograms}/>
        {this.props.children}
      </>
    )
  }
}

export default OTTHomeLayout;

OTTHomeLayout.sections = layoutItems