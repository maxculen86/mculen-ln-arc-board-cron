import React, { Component } from 'react'
import SpecialVideoComponent from '../components/specialVideo';
import Consumer from 'fusion:consumer';
import get from 'lodash.get';
import filter from '../../../../../../content/filters/OTT/homeVideoItem';


class SpecialVideo extends Component {
  constructor(props) {
    super(props)
    
    const { cached, fetched } = this.getContent({
      sourceName: 'ottVideosSource',
      query: {
        ids: this.props.videoIds
      }
      ,filter
    });
    this.state = { videos: get(cached, 'content_elements', null) };
    console.log('cache', this.state.videos)
    fetched.then(response => {
      const fetchedVideos = get(response, 'content_elements', null)
      if(fetchedVideos)
        this.setState({ videos: fetchedVideos })
    })
  }

render() {
  if(!this.state.videos)
    return <></>
  return <SpecialVideoComponent videos={this.state.videos} />
  }
}

export default Consumer(SpecialVideo)