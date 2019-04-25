import React, { Component } from 'react';
import VideoArticleComponent from '../components/videoArticle';
export default class VideoArticle extends Component {
    render() {
        console.log(this.props);
        const href = `/program/video/${this.props.id}/`;
        return (
            <VideoArticleComponent
                description={this.props.description}
                imgSrc={this.props.imgSrc}
                href={href}
            />
        );
    }
}
