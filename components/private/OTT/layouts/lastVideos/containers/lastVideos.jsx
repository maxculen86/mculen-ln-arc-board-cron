import React, { Component } from 'react'
import LastVideosComponent from '../components/lastVideos';
import Consumer from 'fusion:consumer';
import get from 'lodash.get';
import filter from '../../../../../../content/filters/OTT/homeVideoItem';


class LastVideos extends Component {
  constructor(props) {
    super(props)

    const { cached, fetched } = this.getContent({
      sourceName: 'ottVideoSource',
      query: {
        query: 'sort=publish_date:desc&from=0&size=8'
      }
      ,filter
    });
    this.state = { videos: get(cached, 'content_elements', null) };
    fetched.then(response => {
      const fetchedVideos = get(response, 'content_elements', null)
      if(fetchedVideos)
        this.setState({ videos: fetchedVideos })
    })
  }

render() {
  if(!this.state.videos)
    return <></>
  return <LastVideosComponent videos={this.state.videos} />
  }
}

export default Consumer(LastVideos)
