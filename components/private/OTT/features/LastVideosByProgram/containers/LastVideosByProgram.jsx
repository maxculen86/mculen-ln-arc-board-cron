import React, { PureComponent } from 'react'
import LastVideosByProgramComponent from '../../LastVideosByProgram/components/LastVideosByProgram';
import Consumer from 'fusion:consumer';
import get from 'lodash.get';
import filter from '../../../../../../content/filters/OTT/homeVideoItem';

const PAGE_SIZE = 4
class LastVideosByProgram extends PureComponent {
  constructor(props) {
    12
    console.log("constructor")
    super(props)
    this.state = {
      from: 0,
      videos: []
    }
    this.getVideos();
  }


  getVideos() {
    console.log("getvideos fn")
    const { cached, fetched } = this.getContent({
      sourceName: 'ottVideoSource',
      query: {
        query: `sort=publish_date:desc&from=${this.state.from}&size=${PAGE_SIZE}`
      }
      , filter
    });
    // SI LO DEJO ASI, ME DESAPARECE EL STATE "from"
    // this.state = { videos: get(cached, 'content_elements', null) };
    const cachedVideos = get(cached, 'content_elements', null)
    this.setState({ videos: cachedVideos })

    fetched.then(response => {
      console.log("fetch")
      const fetchedVideos = get(response, 'content_elements', null)
      if (fetchedVideos) {
        //CUANDO ACTUALIZA EL ESTADO CAE EN componentDidUpdate Y ese vuelve a llamar a getVideos() y se hace un loop
        let resto = this.state.videos.length % PAGE_SIZE;
        console.log('resto', resto)
        console.log('videos',this.state.videos)
        if (resto == 0)
          this.state.videos = this.state.videos.splice(this.state.videos.length - PAGE_SIZE)
        else
          this.state.videos = this.state.videos.splice(this.state.videos.length - resto)
        this.setState(ps => {return { videos: [...ps.videos, fetchedVideos] }})
      }
    })
  }

  nextPage = () => {
    console.log('next')
    this.state.from = this.state.from + 8
    this.getVideos();
  }

  render() {
    this.state.renders = this.state.renders + 1
    if (this.state.renders > 10)
      return null
    console.log("render")
    if (!this.state.videos)
      return <></>
    return <LastVideosByProgramComponent videos={this.state.videos} nextPageHandler={this.nextPage} />
  }
}

export default Consumer(LastVideosByProgram)
