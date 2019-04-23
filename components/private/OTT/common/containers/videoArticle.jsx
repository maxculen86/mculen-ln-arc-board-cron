import React, { Component } from 'react';
import VideoArticleComponent from '../components/videoArticle';
export default class VideoArticle extends Component {
    render() {
        return (
            <VideoArticleComponent
                description={this.props.description}
                imgSrc={this.props.imgSrc}
                href={this.props.href}
            />
        );
    }
}
