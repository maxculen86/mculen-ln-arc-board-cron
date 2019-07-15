import React, { Component } from 'react';
import VideoArticleComponent from './component';
import withCorrectHref from '../../../common/hocs/withCorrectHref';

class VideoArticle extends Component {
    constructor(props) {
        super(props);
    }
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
export default withCorrectHref(VideoArticle);
