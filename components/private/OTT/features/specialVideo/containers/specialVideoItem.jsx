import React, { Component } from 'react';
import SpecialVideoItemCompoment from '../components/specialVideoItem';

class SpecialVideoItem extends Component {
  render() {
    return (<SpecialVideoItemCompoment imgSrc={this.props.imgSrc} />)
  }
}

export default SpecialVideoItem