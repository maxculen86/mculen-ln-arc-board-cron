import React, { Component } from 'react';
import VideoArticleComponent from './component';
import withCorrectHref from '../../../common/hocs/withCorrectHref';

const VideoArticle = () => {
    return (
        <VideoArticleComponent
            description={this.props.description}
            imgSrc={this.props.imgSrc}
            href={this.props.href}
        />
    );
};

export default withCorrectHref(VideoArticle);
