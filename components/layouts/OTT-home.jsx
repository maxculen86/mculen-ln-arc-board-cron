import React, { PureComponent } from 'react';
import CurrentPrograms from '../private/OTT/layout/currentPrograms/containers/currentPrograms';
import { headerItems, currentPrograms } from '../private/OTT/layout/OTTHomeIndex';
import Header from '../private/OTT/layout/header/containers/header';


const layoutItems = [
    'main'
];

class OTTHomeLayout extends PureComponent {
  render() {
    return (
      <>
      <Header items={headerItems}/>
      <CurrentPrograms items={currentPrograms}/>
        {this.props.children}
      </>
    )
  }
}

export default OTTHomeLayout;

OTTHomeLayout.sections = layoutItems