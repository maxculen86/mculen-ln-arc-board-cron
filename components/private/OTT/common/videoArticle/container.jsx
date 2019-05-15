import React, { Component } from 'react';
import VideoArticleComponent from './component';

export default class VideoArticle extends Component {
    render() {
        return (
            <VideoArticleComponent
                description={this.props.description}
                imgSrc={this.props.imgSrc}
                href={this.props.href}
                date={this.props.date}
            />
        );
    }
}
