import React, {PureComponent} from 'react'

export default function slider(WrappedComponent,pageSize) {

    
  return ( class extends PureComponent{
    
    constructor(props){
        super(props)
        this.state = {
            pageSize: pageSize,
            currentStartIndex: 0,
            totalCount: this.props.children.length,
            hasNextPage: this.props.children.length > pageSize ,
            hasPrevPage: false,
        }
        this.DEFAULT_SLIDE_COUNT = pageSize -1
        this.slider = {
            nextButtonHandler: this.nextButtonHandler,
            prevButtonHandler: this.prevButtonHandler,
            hasNextPage: () => this.state.hasNextPage,
            hasPrevPage: () => this.state.hasPrevPage
        }
    }

    hasNextPage= (nextCurrentIndex)=>{
        return this.state.totalCount > nextCurrentIndex + this.state.pageSize
    }
    hasPrevPage= (nextCurrentIndex)=>{
        return  nextCurrentIndex > 0
    }
    nextButtonHandler = () =>{
        this.setState({
            currentStartIndex: this.state.currentStartIndex + this.DEFAULT_SLIDE_COUNT,
            hasNextPage: this.hasNextPage(this.state.currentStartIndex + this.DEFAULT_SLIDE_COUNT),
            hasPrevPage: true
         })
    }
    prevButtonHandler = ()=>{
        this.setState({
            currentStartIndex: this.state.currentStartIndex - this.DEFAULT_SLIDE_COUNT,
            hasPrevPage: this.hasPrevPage(this.state.currentStartIndex - this.DEFAULT_SLIDE_COUNT),
            hasNextPage: true 
        })
    }

  

    render(){
        return (<WrappedComponent slider={this.slider} {...this.props} >
            {this.props.children.slice(this.state.currentStartIndex, this.state.currentStartIndex + this.state.pageSize)}
        </WrappedComponent>)
    }
  }
  )
}
