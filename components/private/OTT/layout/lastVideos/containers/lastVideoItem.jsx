import React, { Component } from 'react'
import LastVideoItemComponent from '../components/lastVideoItem';

class LastVideoItem extends Component {
  render() {
    return(
        <LastVideoItemComponent title={this.props.title} imgSrc={this.props.imgSrc}/>
    )
  }
}

export default LastVideoItem
