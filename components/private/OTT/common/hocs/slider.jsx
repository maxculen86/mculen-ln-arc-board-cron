import React, {PureComponent} from 'react'

export default function slider(WrappedComponent,pageSize) {

    
  return ( class extends PureComponent{
    
    constructor(props){
        super(props)
        this.state = {
            pageSize: pageSize,
            currentStartIndex: 0,
            totalCount: this.props.children.length,
            showNextPage: this.props.children.length > pageSize ,
            showPrevPage: false,
        }
        this.DEFAULT_SLIDE_COUNT = pageSize -1
        console.log('constructor hoc', this.state)
        this.slider = {
            nextPageHandler: this.nextPageHandler,
            prevPageHandler: this.prevPageHandler,
            showNextPage: () => this.state.showNextPage,
            showPrevPage: () => this.state.showPrevPage
        }
    }

    showNextPage= (nextCurrentIndex)=>{
        return this.props.children.length > nextCurrentIndex + this.state.pageSize
    }
    showPrevPage= (nextCurrentIndex)=>{
        return  nextCurrentIndex > 0
    }
    nextPageHandler = () =>{
        console.log('next')
        this.setState({
            currentStartIndex: this.state.currentStartIndex + this.DEFAULT_SLIDE_COUNT,
            showNextPage: this.showNextPage(this.state.currentStartIndex + this.DEFAULT_SLIDE_COUNT),
            showPrevPage: true
         })
    }
    prevPageHandler = ()=>{
        console.log('prev')
        this.setState({
            currentStartIndex: this.state.currentStartIndex - this.DEFAULT_SLIDE_COUNT,
            showPrevPage: this.showPrevPage(this.state.currentStartIndex - this.DEFAULT_SLIDE_COUNT),
            showNextPage: true 
        })
    }

  

    render(){
        console.log('render hoc', this.state)
        return (<WrappedComponent slider={this.slider} {...this.props} >
            {this.props.children.slice(this.state.currentStartIndex, this.state.currentStartIndex + this.state.pageSize)}
        </WrappedComponent>)
    }
  }
  )
}
