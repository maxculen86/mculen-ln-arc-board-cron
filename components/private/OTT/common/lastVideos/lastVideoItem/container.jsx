import React, { Component } from 'react';
import LastVideoItemComponent from './component';

class LastVideoItem extends Component {
    render() {
        return (
            <LastVideoItemComponent
                title={this.props.title}
                imgSrc={this.props.imgSrc}
                id={this.props.id}
            />
        );
    }
}

export default LastVideoItem;
