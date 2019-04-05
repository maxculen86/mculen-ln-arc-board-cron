import React, { Component } from 'react'
import LastVideosByProgramComponent from '../../LastVideosByProgram/components/LastVideosByProgram';
import Consumer from 'fusion:consumer';
import get from 'lodash.get';
import filter from '../../../../../../content/filters/OTT/homeVideoItem';

const PAGE_SIZE = 12
class LastVideosByProgram extends Component {
  constructor(props) {
    super(props)
    this.state = {
        from: 0,
        videos: []
    }
    this.getVideos();
  }
  componentDidUpdate(){
    
    console.log('cwrp')
    //loop of death
    //this.getVideos();
  }
  getVideos(){
    const { cached, fetched } = this.getContent({
        sourceName: 'ottVideoSource',
        query: {
          query: `sort=publish_date:desc&from=${this.state.from}&size=${PAGE_SIZE}&q=taxonomy.sections._id="/${this.props.sectionId}"`
        }
        ,filter
      });
      // SI LO DEJO ASI, ME DESAPARECE EL STATE "from"
      // this.state = { videos: get(cached, 'content_elements', null) };
      this.state.videos = get(cached, 'content_elements', null)

      fetched.then(response => {
        const fetchedVideos = get(response, 'content_elements', null)
        if(fetchedVideos)
          //CUANDO ACTUALIZA EL ESTADO CAE EN componentDidUpdate Y ese vuelve a llamar a getVideos() y se hace un loop
          this.setState({ videos: fetchedVideos })
      })
  }

  nextPage = () =>{
      console.log('next')
      this.setState({
          from: this.state.from + 8
      })
  }

render() {
  if(!this.state.videos)
    return <></>
  return <LastVideosByProgramComponent videos={this.state.videos} nextPageHandler={this.nextPage} />
  }
}

export default Consumer(LastVideosByProgram)
