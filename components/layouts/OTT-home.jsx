import React, { PureComponent } from 'react';
import CurrentPrograms from '../private/OTT/layout/containers/currentPrograms';
import { headerItems } from '../private/OTT/layout/OTTHomeIndex';
import Header from '../private/OTT/layout/containers/header';


const layoutItems = [
    'main'
];

class OTTHomeLayout extends PureComponent {
  render() {
    console.log(headerItems)
    return (
      <>
      <Header items={headerItems}/>
      <CurrentPrograms/>
        {this.props.children}
      </>
    )
  }
}

export default OTTHomeLayout;

OTTHomeLayout.sections = layoutItems