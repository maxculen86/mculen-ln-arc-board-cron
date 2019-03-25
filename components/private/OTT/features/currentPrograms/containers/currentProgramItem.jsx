import React, { Component } from 'react'
import CurrentProgramItemComponent from '../components/currentProgramItem';

class CurrentProgramItem extends Component {
    render() {
        return <CurrentProgramItemComponent
            description={this.props.description}
            imgSrc={this.props.imgSrc}
            href={this.props.href} 
            />
    }
}
export default CurrentProgramItem