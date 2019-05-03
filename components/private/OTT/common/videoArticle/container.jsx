import React, { Component } from 'react';
import VideoArticleComponent from './component';
import getProperties from 'fusion:properties';
import Consumer from 'fusion:consumer';

@Consumer
export default class VideoArticle extends Component {
    render() {
        const siteVars = getProperties(this.props.arcSite);
        const href = siteVars.getVideoUrl(this.props.id);
        return (
            <VideoArticleComponent
                description={this.props.description}
                imgSrc={this.props.imgSrc}
                href={href}
                date={this.props.date}
            />
        );
    }
}
