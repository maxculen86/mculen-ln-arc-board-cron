import React, { PureComponent } from 'react'
import CurrentPrograms from '../private/OTT/layout/containers/currentPrograms'
const layoutItems = [
    'main'
];

class OTTHomeLayout extends PureComponent {
  render() {
    return (
      <>
      <CurrentPrograms/>
        {this.props.children}
      </>
    )
  }
}

export default OTTHomeLayout;

OTTHomeLayout.sections = layoutItems